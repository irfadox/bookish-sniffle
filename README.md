# Bishkek Problems Map 🗺️

An interactive, community-driven map to report and track urban issues in Bishkek, Kyrgyzstan. Built with modern web technologies and designed to help the community.

![Bishkek Map Preview](https://bishkekmap.org)

## 🌟 Features

*   **Interactive Map**: Full-screen map centered on Bishkek using OpenStreetMap & CartoDB Voyager tiles.
*   **Report Issues**: Users can report problems like potholes, trash, safety concerns, lighting, and more.
*   **Photo Uploads**: Attach photos to reports to provide visual evidence.
*   **Live Search**: Real-time address search with autocomplete, optimized for Bishkek locations.
*   **Targeting Mode**: Search results are highlighted with a "bloody red" target pin for precise reporting.
*   **Category Filters**: Toggle visibility of different issue types (Roads, Trash, Safety, etc.).
*   **Clustering**: Markers are clustered to prevent clutter in high-density areas.
*   **Locate Me**: One-click GPS positioning.
*   **Bilingual**: Fully localized in **Russian** (default) and **English**.
*   **Mobile Optimized**: Responsive design with auto-hiding controls on smaller screens.
*   **Shared Database**: Real-time data persistence.

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript (ES6+)
*   **Mapping**: [Leaflet.js](https://leafletjs.com/)
*   **Clustering**: [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
*   **Geocoding**: [Nominatim API](https://nominatim.org/)
*   **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL + Storage)
*   **Deployment**: Cloudfare Pages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
