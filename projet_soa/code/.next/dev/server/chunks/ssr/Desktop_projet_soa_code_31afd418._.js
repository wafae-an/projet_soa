module.exports = [
"[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d967bb37513a43f0411f5d1a74200c19d7e59422":"getVilles"},"",""] */ __turbopack_context__.s([
    "getVilles",
    ()=>getVilles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function getVilles() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/trajets';
        const response = await fetch(`${apiUrl}/villes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Filtrer les chaînes vides si nécessaire
        const filteredData = data.data.filter((ville)=>ville.trim() !== '');
        return {
            ...data,
            data: filteredData,
            count: filteredData.length
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des villes:', error);
        return {
            success: false,
            data: [],
            count: 0
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getVilles
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVilles, "00d967bb37513a43f0411f5d1a74200c19d7e59422", null);
}),
"[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00352877937ff0d44c3c4f410f625eb5647eb87a98":"getVillesDisponibles","400ae79ad92bed6deebbb5c9d82c34354678a8a655":"getLignesAvecArrets"},"",""] */ __turbopack_context__.s([
    "getLignesAvecArrets",
    ()=>getLignesAvecArrets,
    "getVillesDisponibles",
    ()=>getVillesDisponibles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function getLignesAvecArrets(villeNom) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/trajets';
        console.log(`Tentative de récupération des lignes pour: ${villeNom}`);
        const response = await fetch(`${apiUrl}/villes/${villeNom}/lignes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        console.log(`Status de la réponse: ${response.status}`);
        if (!response.ok) {
            if (response.status === 404) {
                return {
                    success: true,
                    data: [],
                    count: 0,
                    ville: villeNom
                };
            }
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Données reçues: ${data.count} lignes pour ${data.ville}`);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des lignes:', error);
        return {
            success: false,
            data: [],
            count: 0,
            ville: villeNom
        };
    }
}
async function getVillesDisponibles() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/trajets';
        const response = await fetch(`${apiUrl}/api/villes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
            return data.data.filter((ville)=>ville.trim() !== '');
        }
        return [];
    } catch (error) {
        console.error('Erreur lors de la récupération des villes:', error);
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getLignesAvecArrets,
    getVillesDisponibles
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLignesAvecArrets, "400ae79ad92bed6deebbb5c9d82c34354678a8a655", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVillesDisponibles, "00352877937ff0d44c3c4f410f625eb5647eb87a98", null);
}),
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
"[project]/Desktop/projet_soa/code/.next-internal/server/app/passager/trajets/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ticketActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/passager/trajets/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00d967bb37513a43f0411f5d1a74200c19d7e59422",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVilles"],
    "400ae79ad92bed6deebbb5c9d82c34354678a8a655",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLignesAvecArrets"],
    "40f3dcc0aaee20e2d661bdbab71ff52f71e2c175ba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ticketActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["purchaseTicketWithTransaction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f2e$next$2d$internal$2f$server$2f$app$2f$passager$2f$trajets$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ticketActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Desktop/projet_soa/code/.next-internal/server/app/passager/trajets/page/actions.js { ACTIONS_MODULE0 => "[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/Desktop/projet_soa/code/actions/ticketActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=Desktop_projet_soa_code_31afd418._.js.map