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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getLignesAvecArrets,
    getVillesDisponibles
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLignesAvecArrets, "400ae79ad92bed6deebbb5c9d82c34354678a8a655", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVillesDisponibles, "00352877937ff0d44c3c4f410f625eb5647eb87a98", null);
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00d967bb37513a43f0411f5d1a74200c19d7e59422",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVilles"],
    "400ae79ad92bed6deebbb5c9d82c34354678a8a655",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLignesAvecArrets"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Desktop/projet_soa/code/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$villeActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/villeActions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$ligneActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/ligneActions.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=Desktop_projet_soa_code_a7c706ff._.js.map