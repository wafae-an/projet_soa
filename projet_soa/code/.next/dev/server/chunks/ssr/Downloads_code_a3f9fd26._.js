module.exports = [
"[project]/Downloads/code/actions/villeActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0092e7a4055448b8587c64af62ecf0c55dce2d3ed7":"getVilles"},"",""] */ __turbopack_context__.s([
    "getVilles",
    ()=>getVilles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function getVilles() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/villes`, {
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getVilles
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVilles, "0092e7a4055448b8587c64af62ecf0c55dce2d3ed7", null);
}),
"[project]/Downloads/code/actions/ligneActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0099fcd4b1805548e34397e9add226c95f5f66b86d":"getVillesDisponibles","4038e6dfbd6fa035b1fa960e77fafe2f1bd8609dde":"getLignesAvecArrets"},"",""] */ __turbopack_context__.s([
    "getLignesAvecArrets",
    ()=>getLignesAvecArrets,
    "getVillesDisponibles",
    ()=>getVillesDisponibles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function getLignesAvecArrets(villeNom) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getLignesAvecArrets,
    getVillesDisponibles
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLignesAvecArrets, "4038e6dfbd6fa035b1fa960e77fafe2f1bd8609dde", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVillesDisponibles, "0099fcd4b1805548e34397e9add226c95f5f66b86d", null);
}),
"[project]/Downloads/code/actions/horairesActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40978f2c971b1301fbc93ccd41d8765240fdff79e4":"rechercherHorairesAvecObjet"},"",""] */ __turbopack_context__.s([
    "rechercherHorairesAvecObjet",
    ()=>rechercherHorairesAvecObjet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function rechercherHorairesAvecObjet(requestData) {
    try {
        // Validation
        if (!requestData.ligne_id || !requestData.arret_depart_id || !requestData.arret_arrivee_id || !requestData.date_recherche) {
            return {
                success: false,
                error: "Tous les champs sont obligatoires",
                ...requestData,
                direction_auto: '',
                temps_trajet_minutes: 0,
                nombre_horaires: 0,
                horaires: []
            };
        }
        // Appel API
        const queryParams = new URLSearchParams(requestData);
        const response = await fetch(`http://localhost:8000/api/horaires?${queryParams}`);
        if (!response.ok) {
            throw new Error('Erreur API');
        }
        const data = await response.json();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/horaires');
        return data;
    } catch (error) {
        return {
            success: false,
            error: "Erreur de connexion au serveur",
            ...requestData,
            direction_auto: '',
            temps_trajet_minutes: 0,
            nombre_horaires: 0,
            horaires: []
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    rechercherHorairesAvecObjet
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rechercherHorairesAvecObjet, "40978f2c971b1301fbc93ccd41d8765240fdff79e4", null);
}),
"[project]/Downloads/code/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/Downloads/code/actions/villeActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Downloads/code/actions/ligneActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Downloads/code/actions/horairesActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/actions/villeActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/actions/ligneActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$horairesActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/actions/horairesActions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/Downloads/code/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/Downloads/code/actions/villeActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Downloads/code/actions/ligneActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Downloads/code/actions/horairesActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0092e7a4055448b8587c64af62ecf0c55dce2d3ed7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVilles"],
    "4038e6dfbd6fa035b1fa960e77fafe2f1bd8609dde",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLignesAvecArrets"],
    "40978f2c971b1301fbc93ccd41d8765240fdff79e4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$horairesActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rechercherHorairesAvecObjet"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Downloads$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Downloads$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$Downloads$2f$code$2f$actions$2f$horairesActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Downloads/code/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/Downloads/code/actions/villeActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Downloads/code/actions/ligneActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/Downloads/code/actions/horairesActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/actions/villeActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/actions/ligneActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$code$2f$actions$2f$horairesActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/code/actions/horairesActions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=Downloads_code_a3f9fd26._.js.map