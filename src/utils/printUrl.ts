import { db } from 'src/database/db';

export function isElectron(): boolean {
  return !!(window && window.process && window.process.type);
}

/**
 * Stocke les données d'impression dans IndexedDB pour que la fenêtre d'impression puisse les récupérer
 * C'est nécessaire pour Electron où window.opener et postMessage peuvent être limités avec le protocole file://
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function storePrintData(type: string, data: any): Promise<number> {
  try {
    // Nettoyer les anciennes données (plus de 1 heure)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    await db.printData.where('createdAt').below(oneHourAgo).delete();

    // Ajouter les nouvelles données
    // On garde la structure pour compatibilité avec le code existant qui attend { type: ..., data: ... }
    const printDataId = await db.printData.add({
      type: type,
      data: { type, data }, // On enveloppe pour que le HTML reçoive le format attendu
      createdAt: new Date(),
    });

    return printDataId as number;
  } catch (error) {
    console.error("Erreur lors du stockage des données d'impression:", error);
    return 0;
  }
}

/**
 * Ouvre une fenêtre d'impression et envoie les données via IndexedDB (et postMessage comme fallback)
 */

export async function openPrintWindowWithMessage(
  url: string,
  message: Record<string, unknown>,
): Promise<Window | null> {
  try {
    // 1. Stocker les données dans IndexedDB d'abord
    const messageType = (message?.type as string) || 'UNKNOWN';
    // Extraire les données réelles si message est déjà enveloppé
    const actualData = message?.data || message;

    await storePrintData(messageType, actualData);

    // 2. Ouvrir la fenêtre
    const printWindow = window.open(url, '_blank');

    if (printWindow) {
      // 3. Essayer aussi postMessage comme fallback (pour le mode web standard)
      printWindow.addEventListener('load', () => {
        try {
          printWindow.postMessage(message, '*');
        } catch (e) {
          console.warn('postMessage failed (expected in Electron file://):', e);
        }
      });
    }

    return printWindow;
  } catch (error) {
    console.error("Erreur lors de l'ouverture de la fenêtre d'impression:", error);
    return null;
  }
}
