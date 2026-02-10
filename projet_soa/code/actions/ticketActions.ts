'use server';

interface PurchaseTicketData {
  userId: string;
  ligneId: string;
  routeName: string;
  departureStation: string;
  arrivalStation: string;
  heureDepart?: string;
  heureArrivee?: string;
  dateRecherche: string;
}

interface TicketResponse {
  success: boolean;
  ticket?: {
    ticket_id: string;
    user_id: string;
    ligne_id: string;
    ticket_code: string;
    price: string;
    status: string;
    purchase_date: string;
    valid_until: string;
    route_name: string;
    departure_station: string;
    arrival_station: string;
    heure_depart?: string;
    heure_arrivee?: string;
    is_valid: boolean;
  };
  message: string;
}

/**
 * Action serveur pour acheter un ticket (SANS transaction)
 */
export async function purchaseTicketWithTransaction(ticketData: PurchaseTicketData): Promise<{ 
  success: boolean; 
  message: string; 
  ticket?: any;
  ticketCode?: string;
}> {
  try {
    // Validation de l'userId
    if (!ticketData.userId) {
      return {
        success: false,
        message: 'ID utilisateur manquant'
      };
    }

    // ✅ CRÉATION DU TICKET SEULEMENT
    const ticketPayload = {
      user_id: ticketData.userId,
      ligne_id: ticketData.ligneId,
      route_name: ticketData.routeName,
      departure_station: ticketData.departureStation,
      arrival_station: ticketData.arrivalStation,
      heure_depart: ticketData.heureDepart || '',
      heure_arrivee: ticketData.heureArrivee || '',
      purchase_date: ticketData.dateRecherche, // ← CORRECTION : Utiliser directement dateRecherche
    };

    console.log('📤 Envoi création ticket:', ticketPayload);

    const ticketResponse = await fetch('http://localhost:9002/api/tickets/purchase/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketPayload)
    });

    // ✅ Lire la réponse brute pour debug
    const responseText = await ticketResponse.text();
    console.log('📥 Réponse brute Django:', responseText);

    let ticketResult;
    try {
      ticketResult = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Erreur parsing JSON:', e);
      return {
        success: false,
        message: 'Réponse invalide du serveur: ' + responseText
      };
    }

    // ✅ Vérifier si c'est une erreur Django
    if (!ticketResponse.ok) {
      console.error('❌ Erreur Django:', ticketResult);
      
      // Amélioration du message d'erreur
      let errorMessage = 'Erreur lors de la création du ticket';
      if (ticketResult.purchase_date) {
        errorMessage = ticketResult.purchase_date[0]; // Message de validation Django
      } else if (ticketResult.error) {
        errorMessage = ticketResult.error;
      } else if (ticketResult.detail) {
        errorMessage = ticketResult.detail;
      } else if (ticketResult.message) {
        errorMessage = ticketResult.message;
      }
      
      return {
        success: false,
        message: errorMessage
      };
    }

    // ✅ SUCCÈS: Ticket créé
    console.log('✅ Ticket créé avec succès:', ticketResult);
    
    return {
      success: true,
      message: 'Ticket créé avec succès',
      ticket: ticketResult.ticket || ticketResult,
      ticketCode: ticketResult.ticket?.ticket_code || ticketResult.ticket_code
    };

  } catch (error) {
    console.error('❌ Erreur achat ticket:', error);
    return {
      success: false,
      message: 'Erreur de connexion au serveur: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
}

/**
 * Action pour valider un ticket
 */
export async function validateTicket(ticketCode: string): Promise<{ 
  success: boolean; 
  message: string; 
  ticket?: any;
}> {
  try {
    const response = await fetch('http://localhost:9002/api/tickets/validate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticket_code: ticketCode
      })
    });

    const result = await response.json();

    return {
      success: response.ok,
      message: result.message || result.detail || 'Validation effectuée',
      ticket: result.ticket || result
    };

  } catch (error) {
    console.error('Erreur validation ticket:', error);
    return {
      success: false,
      message: 'Erreur de connexion au serveur'
    };
  }
}

/**
 * Récupérer les tickets d'un utilisateur
 */
export async function getUserTickets(userId: string): Promise<{
  success: boolean;
  message: string;
  tickets?: any[];
}> {
  try {
    if (!userId) {
      return {
        success: false,
        message: 'ID utilisateur manquant',
        tickets: []
      };
    }

    const response = await fetch(`http://localhost:9002/api/tickets/my_tickets/?user_id=${userId}`);
    
    if (!response.ok) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des tickets',
        tickets: []
      };
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Tickets récupérés avec succès',
      tickets: result.tickets || []
    };

  } catch (error) {
    console.error('Erreur récupération tickets:', error);
    return {
      success: false,
      message: 'Erreur de connexion au serveur',
      tickets: []
    };
  }
}