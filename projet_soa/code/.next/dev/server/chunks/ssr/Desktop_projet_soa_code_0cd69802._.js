module.exports = [
"[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40091a337f11ce29817415367b9a9f05b7a116c702":"getUserTickets","40cb9be340f74f803d609626145907364edafe9160":"validateTicket","40f3dcc0aaee20e2d661bdbab71ff52f71e2c175ba":"purchaseTicketWithTransaction"},"",""] */ __turbopack_context__.s([
    "getUserTickets",
    ()=>getUserTickets,
    "purchaseTicketWithTransaction",
    ()=>purchaseTicketWithTransaction,
    "validateTicket",
    ()=>validateTicket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function purchaseTicketWithTransaction(ticketData) {
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
            purchase_date: ticketData.dateRecherche
        };
        console.log('📤 Envoi création ticket:', ticketPayload);
        const ticketResponse = await fetch('http://localhost:9002/api/tickets/purchase/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
async function validateTicket(ticketCode) {
    try {
        const response = await fetch('http://localhost:9002/api/tickets/validate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
async function getUserTickets(userId) {
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    purchaseTicketWithTransaction,
    validateTicket,
    getUserTickets
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(purchaseTicketWithTransaction, "40f3dcc0aaee20e2d661bdbab71ff52f71e2c175ba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validateTicket, "40cb9be340f74f803d609626145907364edafe9160", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserTickets, "40091a337f11ce29817415367b9a9f05b7a116c702", null);
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/passager/trajets/paiement/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ticketActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/passager/trajets/paiement/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40f3dcc0aaee20e2d661bdbab71ff52f71e2c175ba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ticketActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["purchaseTicketWithTransaction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f2e$next$2d$internal$2f$server$2f$app$2f$passager$2f$trajets$2f$paiement$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ticketActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Desktop/projet_soa/code/.next-internal/server/app/passager/trajets/paiement/page/actions.js { ACTIONS_MODULE0 => "[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ticketActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)");
}),
"[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/Desktop/projet_soa/code/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=Desktop_projet_soa_code_0cd69802._.js.map