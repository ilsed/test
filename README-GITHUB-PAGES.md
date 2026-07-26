# GitHub Pages

Deze export is opgeschoond voor deployment als gewone statische site op GitHub Pages.

Aanpassingen:

- WordPress feed-, xmlrpc- en admin-verwijzingen verwijderd
- tracking- en adminscripts verwijderd
- externe WordPress asset-URLs vervangen door lokale bestanden
- paden relatief gemaakt zodat de site ook werkt als GitHub Pages projectsite
- `.nojekyll` toegevoegd

Aanbevolen deployment:

1. Zet de inhoud van deze map in de root van je GitHub repository.
2. Activeer GitHub Pages op de `main` branch.
3. Gebruik bij voorkeur een custom domain als je de site op productie zet.

Belangrijk:

- Externe links naar sociale media en uitgevers zijn bewust behouden.
- De site is nu een pure statische export; er zijn geen WordPress backend-functies meer.
- De overblijvende plugin-assets zijn verwijderd; de site gebruikt alleen nog statische bestanden onder `assets/`, `vendor/` en de custom fixes.
