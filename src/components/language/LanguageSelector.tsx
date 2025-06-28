import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { languages, getLanguagesByRegion, getPopularLanguages } from '../../utils/languages';

interface LanguageSelectorProps {
  showLabel?: boolean;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  showLabel = true, 
  compact = false 
}) => {
  const { currentLanguage, setLanguage, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const popularLanguages = getPopularLanguages();
  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const regions = [
    'Southern Africa',
    'East Africa', 
    'West Africa',
    'North Africa',
    'Central Africa',
    'Global'
  ];

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  if (compact) {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg mr-1">{language?.flag}</span>
          <ChevronDown size={16} className="text-gray-600" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto overscroll-contain">
                {!searchTerm && (
                  <div className="p-2">
                    <p className="text-xs font-medium text-gray-500 px-2 py-1">Popular</p>
                    {popularLanguages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                          currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="text-lg mr-3">{lang.flag}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{lang.name}</div>
                          <div className="text-xs text-gray-500">{lang.nativeName}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* All Languages */}
                <div className="max-h-48 overflow-y-auto overscroll-contain">
                  {filteredLanguages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                        currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <span className="text-lg mr-3">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{lang.name}</div>
                        <div className="text-xs text-gray-500">{lang.nativeName} • {lang.region}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors w-full"
        whileTap={{ scale: 0.98 }}
      >
        <Globe size={20} className="text-blue-600 mr-3" />
        <div className="flex-1 text-left">
          <div className="flex items-center">
            <span className="text-lg mr-2">{language?.flag}</span>
            <span className="font-medium">{language?.name}</span>
          </div>
          {showLabel && (
            <div className="text-sm text-gray-500">{language?.nativeName}</div>
          )}
        </div>
        <ChevronDown size={16} className="text-gray-600" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {!searchTerm ? (
                // Show by regions when not searching
                regions.map((region) => {
                  const regionLanguages = getLanguagesByRegion(region);
                  if (regionLanguages.length === 0) return null;

                  return (
                    <div key={region} className="p-2">
                      <p className="text-xs font-medium text-gray-500 px-2 py-1 uppercase tracking-wide">
                        {region}
                      </p>
                      {regionLanguages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                            currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                          whileHover={{ scale: 1.01 }}
                        >
                          <span className="text-lg mr-3">{lang.flag}</span>
                          <div className="flex-1">
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-sm text-gray-500">{lang.nativeName}</div>
                          </div>
                          {currentLanguage === lang.code && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  );
                })
              ) : (
                // Show filtered results when searching
                <div className="p-2">
                  {filteredLanguages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                        currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <span className="text-lg mr-3">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-sm text-gray-500">{lang.nativeName} • {lang.region}</div>
                      </div>
                      {currentLanguage === lang.code && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};