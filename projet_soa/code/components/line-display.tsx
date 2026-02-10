'use client'

import { useState, useEffect } from 'react';
import { getLignesAvecArrets, LigneAvecArrets, ApiResponseLignes } from '../actions/ligneActions';

interface Line {
  id: string;
  number: string;
  nom: string;
  ville: string;
  arrets: string[];
  nombre_arrets: number;
}

interface LineDisplayProps {
  city: string;
  onLineSelect: (line: Line) => void;  // ← Déjà correct, envoie toute la ligne
  onBack: () => void;
}

export default function LineDisplay({ city, onLineSelect, onBack }: LineDisplayProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLines, setExpandedLines] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchLines = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response: ApiResponseLignes = await getLignesAvecArrets(city);
        
        if (response.success) {
          const formattedLines: Line[] = response.data.map(ligne => ({
            id: ligne.id,
            number: ligne.numero,
            nom: ligne.nom,
            ville: ligne.ville,
            arrets: ligne.arrets,
            nombre_arrets: ligne.nombre_arrets
          }));
          
          setLines(formattedLines);
        } else {
          setError('Erreur lors du chargement des lignes');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
        console.error('Erreur fetchLines:', err);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchLines();
    }
  }, [city]);

  const toggleExpandLine = (lineId: string) => {
    const newExpanded = new Set(expandedLines);
    if (newExpanded.has(lineId)) {
      newExpanded.delete(lineId);
    } else {
      newExpanded.add(lineId);
    }
    setExpandedLines(newExpanded);
  };

  const isLineExpanded = (lineId: string) => expandedLines.has(lineId);

  // ... (le reste du code loading, error, etc. reste identique)

  return (
    <div className="ml-[280px] min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1e40af] mb-2">
              Lignes disponibles — {city}
            </h2>
            <p className="text-[#374151]">
              {lines.length} ligne{lines.length > 1 ? 's' : ''} disponible{lines.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2 text-[#1e40af] font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Retour
          </button>
        </div>

        {/* Lines Grid */}
        <div className="grid grid-cols-1 gap-6">
          {lines.map((line) => (
            <div
              key={line.id}
              className="bg-white border border-[#e5e7eb] rounded-lg p-6 hover:shadow-lg hover:border-[#1e40af] transition-all group"
            >
              {/* Line Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="inline-block bg-[#1e40af] text-white px-3 py-1 rounded font-bold text-sm">
                    Ligne {line.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {line.nom}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {line.nombre_arrets} arrêts
                    </p>
                  </div>
                </div>
              </div>

              {/* Route Info */}
              {line.arrets.length >= 2 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center text-sm font-medium text-gray-700">
                    <span className="bg-white px-3 py-1 rounded border">{line.arrets[0]}</span>
                    <span className="mx-3 text-blue-500">
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M7 8l-4 4 4 4" />
    <path d="M17 8l4 4-4 4" />
  </svg>
</span>
                    <span className="bg-white px-3 py-1 rounded border">{line.arrets[line.arrets.length - 1]}</span>
                  </div>
                </div>
              )}

              {/* All Stops */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Liste complète des arrêts :</h4>
                  <button
                    onClick={() => toggleExpandLine(line.id)}
                    className="text-sm text-[#1e40af] hover:text-[#1e3a8a] font-medium"
                  >
                    {isLineExpanded(line.id) ? 'Réduire' : 'Voir tous'}
                  </button>
                </div>

                {/* Stops List */}
                <div className="space-y-2">
                  {line.arrets
                    .slice(0, isLineExpanded(line.id) ? line.arrets.length : 8)
                    .map((stop, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-center w-6 h-6 bg-[#1e40af] text-white text-xs font-bold rounded-full mr-3">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">{stop}</span>
                      </div>
                    ))}
                  
                  {!isLineExpanded(line.id) && line.arrets.length > 8 && (
                    <div className="text-center py-2">
                      <button
                        onClick={() => toggleExpandLine(line.id)}
                        className="text-sm text-[#1e40af] hover:text-[#1e3a8a] font-medium"
                      >
                        + {line.arrets.length - 8} arrêts supplémentaires
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => onLineSelect(line)}  // ← Envoie toute la ligne avec ses arrêts
                  className="flex-1 bg-[#1e40af] text-white py-2 rounded font-medium hover:bg-[#1e3a8a] transition-colors text-center"
                >
                  Voir les horaires
                </button>
                <button
                  onClick={() => toggleExpandLine(line.id)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
                >
                  {isLineExpanded(line.id) ? 'Réduire' : 'Développer'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}