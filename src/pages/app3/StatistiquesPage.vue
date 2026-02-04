<template>
  <q-page class="statistiques-page q-pa-md">
    <PageHeader
      title="Statistiques des Timbres"
      subtitle="Analyse et suivi du stock de timbres"
      icon="analytics"
    />

    <!-- Filtres de période -->
    <q-card class="filter-card q-mb-md">
      <q-card-section>
        <div class="row q-col-gutter-md items-end">
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="periodFilter"
              :options="periodOptions"
              label="Période"
              outlined
              dense
              @update:model-value="onPeriodChange"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-input v-model="dateDebut" type="date" label="Date début" outlined dense clearable />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-input v-model="dateFin" type="date" label="Date fin" outlined dense clearable />
          </div>
          <div class="col-12 col-sm-6 col-md-3 row q-gutter-sm">
            <q-btn
              color="grey-7"
              icon="clear"
              label="Réinitialiser"
              outline
              @click="resetFilters"
              class="col"
              no-caps
            />
            <q-btn
              color="primary"
              icon="refresh"
              label="Actualiser"
              unelevated
              @click="loadStatistics"
              :loading="loading"
              class="col"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Cartes de statistiques principales -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-6 col-md-3">
        <StatisticsCard
          :value="stats.stockTotal"
          title="Stock Total"
          :subtitle="`${stats.typesTimbres} types de timbres`"
          icon="confirmation_number"
          icon-color="grey-7"
          border-color="#E67E22"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <StatisticsCard
          :value="stats.valeurTotale"
          title="Valeur Totale"
          subtitle="En stock actuellement"
          icon="payments"
          icon-color="grey-7"
          border-color="#2E7D32"
          format="currency"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <StatisticsCard
          :value="stats.approvisionnements"
          title="Appros Période"
          :subtitle="formatMontant(stats.montantAppros)"
          icon="inventory"
          icon-color="grey-7"
          border-color="#E67E22"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <StatisticsCard
          :value="stats.versements"
          title="Versements Période"
          :subtitle="formatMontant(stats.montantVersements)"
          icon="upload"
          icon-color="grey-7"
          border-color="#E67E22"
        />
      </div>
    </div>

    <!-- Graphiques et analyses -->
    <div class="row q-col-gutter-md">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>

      <div v-if="!loading && stats.stockTotal === 0" class="col-12 text-center q-pa-xl">
        <q-icon name="bar_chart" size="64px" color="grey-5" />
        <div class="text-h6 text-grey-6 q-mt-md">Aucune donnée disponible</div>
        <div class="text-caption text-grey-5">
          Créez une balance d'entrée ou un approvisionnement pour l'exercice {{ selectedYear }}
        </div>
      </div>

      <div v-if="!loading && stats.stockTotal > 0" class="col-12 col-md-6">
        <ChartCard
          title="Répartition du Stock par Valeur"
          :chart-config="stockChartConfig"
          header-class="text-grey-8"
        />
      </div>

      <div v-if="!loading && stats.stockTotal > 0" class="col-12 col-md-6">
        <ChartCard
          title="Valeur du Stock par Type"
          :chart-config="valeurChartConfig"
          header-class="text-grey-8"
        />
      </div>

      <div v-if="!loading && stats.stockTotal > 0" class="col-12">
        <ChartCard
          title="Évolution des Opérations"
          :chart-config="evolutionChartConfig"
          header-class="text-grey-8"
          container-class="chart-container-large"
        />
      </div>

      <div v-if="!loading && stats.stockTotal > 0" class="col-12">
        <q-card class="details-card">
          <q-card-section class="bg-grey-1">
            <div class="text-h6 text-grey-8">Détails par Type de Timbre</div>
          </q-card-section>
          <q-card-section>
            <q-table
              :rows="detailsTimbres"
              :columns="timbresColumns"
              row-key="valeur"
              :pagination="{ rowsPerPage: 10 }"
              flat
              bordered
            >
              <template v-slot:body-cell-valeur="props">
                <q-td :props="props">
                  <q-badge color="primary" :label="props.row.valeur + ' FCFA'" />
                </q-td>
              </template>
              <template v-slot:body-cell-stock="props">
                <q-td :props="props">
                  <div class="row items-center">
                    <div class="col-auto q-mr-md">
                      <span class="text-weight-bold">{{ formatNumber(props.row.stock) }}</span>
                    </div>
                    <div class="col">
                      <q-linear-progress
                        :value="props.row.stock / 1000"
                        :color="getStockColor(props.row.stock)"
                        size="8px"
                      />
                    </div>
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-valeurStock="props">
                <q-td :props="props" class="text-weight-bold" style="color: #2e7d32">
                  {{ formatMontant(props.row.valeurStock) }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { type ChartConfiguration, type TooltipItem, type ChartTypeRegistry } from 'chart.js';
import PageHeader from 'src/components/PageHeader.vue';
import StatisticsCard from 'src/components/StatisticsCard.vue';
import ChartCard from 'src/components/ChartCard.vue';
import { db } from 'src/database/db';
import type {
  TimbresApprovisionnement,
  TimbresRemise,
  TimbresVersement,
  TimbresBalanceEntree,
} from 'src/database/db';

const $q = useQuasar();

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

const loading = ref(false);
const periodFilter = ref('mois');
const dateDebut = ref('');
const dateFin = ref('');

const approvisionnements = ref<TimbresApprovisionnement[]>([]);
const remises = ref<TimbresRemise[]>([]);
const versements = ref<TimbresVersement[]>([]);
const balancesEntree = ref<TimbresBalanceEntree[]>([]);

const periodOptions = [
  { label: "Aujourd'hui", value: 'jour' },
  { label: 'Cette semaine', value: 'semaine' },
  { label: 'Ce mois', value: 'mois' },
  { label: 'Ce trimestre', value: 'trimestre' },
  { label: 'Cette année', value: 'annee' },
  { label: 'Personnalisé', value: 'custom' },
];

const stockActuel = computed(() => {
  const valeursTimbre: (500 | 1000 | 3000)[] = [500, 1000, 3000];
  const stock: Record<number, number> = {};

  valeursTimbre.forEach((valeur) => {
    stock[valeur] = 0;
  });

  const balancesBES1 = balancesEntree.value.filter(
    (b) => b.type.includes('BE-S1') || b.type.includes('INITIAL') || b.type.includes('Stock'),
  );

  balancesBES1.forEach((balance) => {
    if (balance.timbres) {
      valeursTimbre.forEach((valeur) => {
        stock[valeur] = (stock[valeur] ?? 0) + (balance.timbres[valeur] || 0);
      });
    }
  });

  approvisionnements.value.forEach((appro) => {
    if (appro?.timbres) {
      valeursTimbre.forEach((valeur) => {
        stock[valeur] = (stock[valeur] ?? 0) + (appro.timbres[valeur] || 0);
      });
    }
  });

  remises.value.forEach((remise) => {
    if (remise?.timbres) {
      valeursTimbre.forEach((valeur) => {
        stock[valeur] = (stock[valeur] ?? 0) - (remise.timbres[valeur] || 0);
      });
    }
  });

  return stock;
});

const stats = computed(() => {
  const valeursTimbre: (500 | 1000 | 3000)[] = [500, 1000, 3000];

  const stockTotal = valeursTimbre.reduce(
    (sum, valeur) => sum + (stockActuel.value[valeur] || 0),
    0,
  );

  const valeurTotale = valeursTimbre.reduce(
    (sum, valeur) => sum + (stockActuel.value[valeur] || 0) * valeur,
    0,
  );

  const filterByPeriod = (items: { date: string | Date }[]) => {
    if (!dateDebut.value || !dateFin.value) return items;
    const start = new Date(dateDebut.value).getTime();
    const end = new Date(dateFin.value).getTime() + 86400000 - 1;
    return items.filter((i) => {
      const d = new Date(i.date).getTime();
      return d >= start && d <= end;
    });
  };

  const approsFiltered = filterByPeriod(approvisionnements.value) as TimbresApprovisionnement[];
  const versementsFiltered = filterByPeriod(versements.value) as TimbresVersement[];

  const nbAppros = approsFiltered.length;
  const montantAppros = approsFiltered.reduce((sum, a) => sum + (a.total || 0), 0);

  const nbVersements = versementsFiltered.length;
  const montantVersements = versementsFiltered.reduce((sum, v) => sum + (v.total || 0), 0);

  return {
    stockTotal,
    typesTimbres: 3,
    valeurTotale,
    approvisionnements: nbAppros,
    montantAppros,
    versements: nbVersements,
    montantVersements,
  };
});

const detailsTimbres = computed(() => {
  const valeursTimbre: (500 | 1000 | 3000)[] = [500, 1000, 3000];

  return valeursTimbre.map((valeur) => {
    const stock = stockActuel.value[valeur] || 0;
    const valeurStock = stock * valeur;

    let appros = 0;
    approvisionnements.value.forEach((appro) => {
      if (appro?.timbres) {
        appros += appro.timbres[valeur] || 0;
      }
    });

    let remisesQte = 0;
    remises.value.forEach((remise) => {
      if (remise?.timbres) {
        remisesQte += remise.timbres[valeur] || 0;
      }
    });

    let versementsQte = 0;
    versements.value.forEach((versement) => {
      if (versement?.timbres) {
        versementsQte += versement.timbres[valeur] || 0;
      }
    });

    return {
      valeur,
      stock,
      valeurStock,
      appros,
      remises: remisesQte,
      versements: versementsQte,
    };
  });
});

const timbresColumns = [
  { name: 'valeur', label: 'Valeur', field: 'valeur', align: 'center' as const, sortable: true },
  { name: 'stock', label: 'Stock Actuel', field: 'stock', align: 'left' as const, sortable: true },
  {
    name: 'valeurStock',
    label: 'Valeur Stock',
    field: 'valeurStock',
    align: 'right' as const,
    sortable: true,
  },
  { name: 'appros', label: 'Appros', field: 'appros', align: 'center' as const, sortable: true },
  { name: 'remises', label: 'Remises', field: 'remises', align: 'center' as const, sortable: true },
  {
    name: 'versements',
    label: 'Versements',
    field: 'versements',
    align: 'center' as const,
    sortable: true,
  },
];

function formatMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(montant);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

function getStockColor(stock: number): string {
  if (stock < 100) return 'negative';
  if (stock < 200) return 'warning';
  return 'positive';
}

function onPeriodChange() {
  const today = new Date();
  let debut = new Date();
  let fin = new Date();

  switch (periodFilter.value) {
    case 'jour':
      debut = new Date(today);
      fin = new Date(today);
      break;
    case 'semaine':
      debut = new Date(today.setDate(today.getDate() - today.getDay()));
      fin = new Date();
      break;
    case 'mois':
      debut = new Date(today.getFullYear(), today.getMonth(), 1);
      fin = new Date();
      break;
    case 'trimestre': {
      const quarter = Math.floor(today.getMonth() / 3);
      debut = new Date(today.getFullYear(), quarter * 3, 1);
      fin = new Date();
      break;
    }
    case 'annee':
      debut = new Date(today.getFullYear(), 0, 1);
      fin = new Date();
      break;
    default:
      return;
  }

  dateDebut.value = debut.toISOString().split('T')[0]!;
  dateFin.value = fin.toISOString().split('T')[0]!;

  void loadStatistics();
}

function resetFilters() {
  periodFilter.value = 'mois';
  onPeriodChange();
}

async function loadStatistics() {
  loading.value = true;
  try {
    const mairieId = 1;
    const exercice = selectedYear.value;

    const [appros, remisesList, versementsList, balances] = await Promise.all([
      db.timbresApprovisionnements
        .where('exercice')
        .equals(exercice)
        .and((a) => a.mairieId === mairieId)
        .toArray(),
      db.timbresRemises
        .where('exercice')
        .equals(exercice)
        .and((r) => r.mairieId === mairieId)
        .toArray(),
      db.timbresVersements
        .where('exercice')
        .equals(exercice)
        .and((v) => v.mairieId === mairieId)
        .toArray(),
      db.timbresBalancesEntree
        .where('exercice')
        .equals(exercice)
        .and((b) => b.mairieId === mairieId)
        .toArray(),
    ]);

    approvisionnements.value = appros;
    remises.value = remisesList;
    versements.value = versementsList;
    balancesEntree.value = balances;
  } catch (error) {
    console.error('Erreur:', error);
    $q.notify({
      type: 'negative',
      message: 'Erreur lors du chargement des statistiques',
    });
  } finally {
    loading.value = false;
  }
}

const stockChartConfig = computed<ChartConfiguration>(() => ({
  type: 'doughnut',
  data: {
    labels: detailsTimbres.value.map((t) => `${t.valeur} FCFA`),
    datasets: [
      {
        label: 'Stock',
        data: detailsTimbres.value.map((t) => t.stock),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<keyof ChartTypeRegistry>) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${formatNumber(value)} timbres`;
          },
        },
      },
    },
  },
}));

const valeurChartConfig = computed<ChartConfiguration>(() => ({
  type: 'bar',
  data: {
    labels: detailsTimbres.value.map((t) => `${t.valeur} FCFA`),
    datasets: [
      {
        label: 'Valeur du stock',
        data: detailsTimbres.value.map((t) => t.valeurStock),
        backgroundColor: '#66BB6A',
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<keyof ChartTypeRegistry>) {
            const value = context.parsed.y || 0;
            return `Valeur: ${formatMontant(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            return formatMontant(Number(tickValue));
          },
        },
      },
    },
  },
}));

const evolutionChartConfig = computed<ChartConfiguration>(() => {
  const labels = [
    'Janv',
    'Févr',
    'Mars',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Août',
    'Sept',
    'Oct',
    'Nov',
    'Déc',
  ];
  const appData = new Array(12).fill(0);
  const remData = new Array(12).fill(0);
  const verData = new Array(12).fill(0);

  const processData = (items: Array<{ date: string | Date; total?: number }>, target: number[]) => {
    for (const item of items) {
      const d = new Date(item.date);
      if (d.getFullYear() === selectedYear.value) {
        const month = d.getMonth();
        if (month >= 0 && month < 12) {
          const val = target[month];
          if (typeof val === 'number') {
            target[month] = val + (item.total || 0);
          }
        }
      }
    }
  };

  processData(approvisionnements.value, appData);
  processData(remises.value, remData);
  processData(versements.value, verData);

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Approvisionnements',
          data: appData,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Remises',
          data: remData,
          borderColor: '#FFA726',
          backgroundColor: 'rgba(255, 167, 38, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Versements',
          data: verData,
          borderColor: '#AB47BC',
          backgroundColor: 'rgba(171, 71, 188, 0.1)',
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function (context: TooltipItem<keyof ChartTypeRegistry>) {
              const label = context.dataset.label || '';
              const value = context.parsed.y || 0;
              return `${label}: ${formatMontant(value)}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (tickValue: string | number) {
              return formatMontant(Number(tickValue));
            },
          },
        },
      },
    },
  };
});

onMounted(async () => {
  onPeriodChange();
  await loadStatistics();
});
</script>

<style scoped lang="scss">
.statistiques-page {
  max-width: 1400px;
  margin: 0 auto;
}

.filter-card,
.details-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
}

.chart-container-large {
  position: relative;
  height: 400px;
}
</style>
