# Viewlift Web SDK Quickstart

Welcome to the **Viewlift Web SDK Quickstart** repository! This project provides a fully functional React application designed to demonstrate the seamless integration of Viewlift's **Player**, **Auth**, and **Analytics** Web SDKs. Crafted for developers, this quickstart enables rapid adoption of Viewlift’s powerful SDKs by offering preconfigured, production-ready code that can be easily copied and pasted into your own React projects. The application showcases a practical implementation with a home page, a not-found page, and reusable components, providing a real-world example of how to leverage Viewlift’s SDKs for media playback, user authentication, and analytics tracking.

## Table of Contents
- [Purpose](#purpose)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Quickstart Code Snippets](#quickstart-code-snippets)

## Purpose
The Viewlift Web SDK Quickstart serves as a comprehensive reference for developers looking to integrate Viewlift’s Web SDKs into their React applications. The included React app demonstrates key functionalities:
- **User Authentication**: Securely authenticate users using the Viewlift Auth SDK, enabling access to protected content and personalized experiences.
- **Media Playback**: Stream high-quality video content with the Viewlift Player SDK, offering a customizable and responsive player interface.
- **Analytics Tracking**: Monitor user interactions and engagement metrics with the Viewlift Analytics SDK, providing insights into content consumption and user behavior.

This repository is designed for **plug-and-play** use, allowing developers to quickly copy and paste code snippets and configurations into their projects. The application includes a sample home page with a content tray, a not-found page for handling invalid routes, and a dedicated `VlPlayer` component for SDK integration, making it easy to adapt to your own use cases. For detailed code examples, see [quickstart.md](./quickstart.md).

## Repository Structure
The repository is structured to provide a clear and organized React application, with all necessary files and configurations for integrating Viewlift’s SDKs. Below is the folder structure:

```
web-sdk-quickstart/
├── react-app/
│   ├── src/
│   │   ├── App.jsx                    # Main app component with client-side routing
│   │   ├── index.jsx                  # Entry point for the React application
│   │   ├── styles/
│   │   │   └── main.css               # Global CSS styles
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── index.js           # Home page component with content tray
│   │   │   │   └── style.scss         # SCSS styles for the home page
│   │   │   ├── Not found/
│   │   │   │   ├── index.js           # 404 page component for invalid routes
│   │   │   │   └── style.scss         # SCSS styles for the not-found page
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   ├── index.js           # Header component for navigation
│   │   │   │   └── style.scss         # SCSS styles for the header
│   │   │   ├── Tray/
│   │   │   │   ├── index.js           # Tray component for displaying content
│   │   │   │   ├── style.scss         # SCSS styles for the tray
│   │   │   │   └── traydata/         # Sample data for the content tray
│   │   │   ├── VlPlayer/
│   │   │   │   ├── index.js           # Player component with SDK integration
│   │   │   │   ├── style.scss         # SCSS styles for the player
│   │   │   │   └── config.js         # Configuration for Player and Auth SDKs
│   ├── package.json                   # Dependencies and build scripts
│   ├── .gitignore                    # Git ignore file for the React app
├── quickstart.md                      # Code snippets for SDK integration
├── README.md                          # This file
├── .gitignore                         # Root git ignore file
```

