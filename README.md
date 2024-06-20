# Fetch Finder

## Overview
Fetch Finder is a web application where you can view various dogs up for adoption around your area. Sort by breed, location, age, and then select your favorite dogs and a perfect match will be found for you! 

![Screenshot 2024-06-20 at 1 59 18 PM](https://github.com/juchengca/fetchfinder/assets/110491010/e48ca0f0-6a03-450f-b90d-2c6d449f0d22)

### Description
This application was written using the following tech stack:
- **Front-End**: JavaScript, React, Tailwind CSS, FontAwesome
- **Back-End**: Node.js, Express.js, Axios
- **Build Tools**: Webpack, Babel
- **Hosting**: Amazon EC2

### Prerequisites
- Node.js 
- npm 

### Installation and Setup

1. **Clone the Repository**
    ```bash
    git clone https://github.com/juchengca/fetchfinder.git
    cd fetchfinder
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the Application Locally**
    Open three separate terminal windows and run the following commands in each:

    - **Client Development Server**
      ```bash
      npm run client-dev
      ```

    - **Server Development Server**
      ```bash
      npm run server-dev
      ```

    - **Tailwind CSS Watcher**
      ```bash
      npm run daisy-dev
      ```

4. **Access the Application**
    Open your browser and navigate to:
    ```
    http://localhost:3000
    ```
5. **Enable Third-Party Cookies**
    For the application to work correctly, you need to enable third-party cookies in your browser. 

    - **Chrome**
        1. Go to `Settings`.
        2. Click on `Privacy and security`.
        3. Click on `Cookies and other site data`.
        4. Ensure `Block third-party cookies` is not selected.

    - **Safari on macOS**
        1. Open `Safari`.
        2. Go to `Preferences`.
        3. Click on the `Privacy` tab.
        4. Uncheck `Prevent cross-site tracking`.

    - **Safari on iOS**
        1. Open `Settings`.
        2. Scroll down and select `Safari`.
        3. Toggle off `Prevent Cross-Site Tracking`.

Please feel free to contact me with any questions!
