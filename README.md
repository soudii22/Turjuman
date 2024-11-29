# **Turjuman - Translation Application**

Turjuman is a dynamic and user-friendly translation application that allows users to translate text between different languages, save translations, and optionally mark them as favorites. The application provides a personalized experience, enabling users to manage their translations securely.

---

## **Features**
- **Dynamic Translation**: Translate single words or entire sentences between multiple languages.
- **Favorites Management**: Mark translations as favorites for quick access.
- **User-Specific Data**: Securely save translations for individual users.
- **Language Pair Support**: Specify source and target languages for precise translations.
- **Search and Filters**: Retrieve translations based on keywords, languages, or favorites.
- **Auto Language Detection**: Automatically detect the source language if not specified.
- **Export Options**: (Planned) Allow users to download their translations in CSV or JSON format.

---

## **Tech Stack**
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Translation API**: [`translate-google`](https://www.npmjs.com/package/translate-google) npm package
- **Authentication**: JWT-based authentication for secure user access.

---

## **Setup Instructions**
Follow these steps to set up the project locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/Mohamed-Elshesheny/Turjuman.git
cd Turjuman

Get User Translations

	•	GET /user-translations
	•	Retrieve all translations saved by the logged-in user.

Get Favorite Translations

	•	GET /favorites
	•	Retrieve all translations marked as favorites by the logged-in user.
Versioning

We use semantic versioning for releases:
	•	Current Version: v1.0.0
	•	Upcoming Version: v1.1.0 (includes minor fixes and enhanced translation features)
	•	Future Version: v2.0.0 (AI-powered contextual translations)
Roadmap

	1.	v1.1.0:
	•	Add bulk translation support.
	•	Improve the favorites management system.
	2.	v2.0.0:
	•	Integrate an AI-based model for contextual and accurate translations.
	•	Add speech-to-text and text-to-speech capabilities.
	3.	Beyond v2.0.0:
	•	Advanced grammar and style-checking features.
	•	Multilingual translation support (translate into multiple languages at once).

License

This project is licensed under the MIT License. See the LICENSE file for more details.
