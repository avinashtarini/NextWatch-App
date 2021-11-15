This is **Nxt Watch** a clone to **Youtube**. Here users can browse and watch different videos as per their interest just like youtube.

### Features:

- **Login Route**

  - When a invalid username and password are provided and the Login button is clicked, then the respective error message received from the response will be displayed
  - When a valid username and password are provided and the Login button is clicked, then the page will be navigated to the **Home** route
  - When an _unauthenticated_ user, tries to access the `HomeRoute`, `TrendingRoute`, `GamingRoute`, `SavedVideosRoute`, `VideoDetailsRoute`, then the page is be navigated to **Login** route
  - When an _authenticated_ user, tries to access the `HomeRoute`, `TrendingRoute`, `GamingRoute`, `SavedVideosRoute`, `VideoDetailsRoute`, then the page is be navigated to the respective route
  - When an authenticated user tries to access the `LoginRoute`, then the page is redirected to the **Home** route
  - When show password checkbox is checked, then the password is be shown
  - When show password checkbox is unchecked, then the password is be masked
  - After successfull login Jwt_token recieved will be stored in Cookies.

- **Home Route**

  - When an authenticated user opens the **Home** Route,
    - An HTTP GET request will be made with respective API
      - **_Loader_** will be displayed while the HTTP request is fetching the data
      - After the data is fetched successfully, the list of videos will be displayed in the UI
      - If the HTTP GET request made is unsuccessful, then Failure view will be displayed
        - When the **Retry** button is clicked, an HTTP GET request will be made to respective API
    - When a non-empty value is provided in the Search Input and button with search icon is clicked
      - HTTP GET request with `jwt_token` in the Cookies and query parameter `search` with value as the text provided in the Search Input will be done
      - **_Loader_** will be displayed while the HTTP request is fetching the data
      - After the data is fetched successfully, the list of videos will be displayed in the UI
    - When the HTTP GET request made to the **homeVideosApiUrl** returns an empty list for videos then **No Videos** page will be displayed
  - When the **website logo** image is clicked, the page is navigated to the **Home** route
  - When a **Video** is clicked, the page is navigated to the **Video Item Details** route
  - Clicks on the **Trending** link in the Sidebar is clicked, then the page is navigated to the **Trending** route
  - Clicks on the **Gaming** link in the Sidebar is clicked, then the page is navigated to the **Gaming** route
  - Clicks on the **Saved Videos** link in the Sidebar is clicked, then the page is navigated to the **SavedVideos** route

- **Trending Route**

  - When an authenticated user opens the **Trending** Route,
    - An HTTP GET request will be made with respective API
      - **_Loader_** will be displayed while the HTTP request is fetching the data
      - After the data is fetched successfully, the list of videos will be displayed in the UI
      - If the HTTP GET request made is unsuccessful, then Failure view will be displayed
        - When the **Retry** button is clicked, an HTTP GET request will be made to respective API
  - When the **website logo** image is clicked, the page is navigated to the **Home** route
  - When a **Video** is clicked, the page is navigated to the **Video Item Details** route
  - Clicks on the **Home** link in the Sidebar is clicked, then the page is navigated to the **Home** route
  - Clicks on the **Gaming** link in the Sidebar is clicked, then the page is navigated to the **Gaming** route
  - Clicks on the **Saved Videos** link in the Sidebar is clicked, then the page is navigated to the **SavedVideos** route

- **Gaming Route**

  - When an authenticated user opens the **Gaming** Route,
    - An HTTP GET request will be made with respective API
      - **_Loader_** will be displayed while the HTTP request is fetching the data
      - After the data is fetched successfully, the list of videos will be displayed in the UI
      - If the HTTP GET request made is unsuccessful, then Failure view will be displayed
        - When the **Retry** button is clicked, an HTTP GET request will be made to respective API
  - When the **website logo** image is clicked, the page is navigated to the **Home** route
  - When a **Video** is clicked, the page is navigated to the **Video Item Details** route
  - Clicks on the **Home** link in the Sidebar is clicked, then the page is navigated to the **Home** route
  - Clicks on the **Trending** link in the Sidebar is clicked, then the page is navigated to the **Trending** route
  - Clicks on the **Saved Videos** link in the Sidebar is clicked, then the page is navigated to the **SavedVideos** route

- **Video Item Details Route**

  - When an authenticated user opens the **Video Item Details Route** Route,
    - An HTTP GET request will be made with respective API
      - **_Loader_** will be displayed while the HTTP request is fetching the data
      - After the data is fetched successfully, the list of videos will be displayed in the UI
      - If the HTTP GET request made is unsuccessful, then Failure view will be displayed
        - When the **Retry** button is clicked, an HTTP GET request will be made to respective API
  - When the **website logo** image is clicked, the page is navigated to the **Home** route
  - Clicks on the **Home** link in the Sidebar is clicked, then the page is navigated to the **Home** route
  - Clicks on the **Trending** link in the Sidebar is clicked, then the page is navigated to the **Trending** route
  - Clicks on the **Saved Videos** link in the Sidebar is clicked, then the page is navigated to the **SavedVideos** route
  - Clicks on the **Gaming** link in the Sidebar is clicked, then the page is navigated to the **Gaming** route

- **SavedVideos Route**

  - When an authenticated user opens the **SavedVideos** Route,
    - If the list of saved videos is empty, then No Saved Videos Found View will be displayed
    - if the list is not emplty then the **Videos** in the list of saved videos should be displayed as a list of videos
  - When the **website logo** image is clicked, the page is navigated to the **Home** route
  - When a **Video** is clicked, the page is navigated to the **Video Item Details** route
  - Clicks on the **Home** link in the Sidebar is clicked, then the page is navigated to the **Home** route
  - Clicks on the **Trending** link in the Sidebar is clicked, then the page is navigated to the **Trending** route
  - Clicks on the **Gaming** link in the Sidebar is clicked, then the page is navigated to the **Gaming** route

- **Not Found Route**

  - When a random path is provided in the URL then the page is navigate to the **Not Found** route

- When the **theme** button in the header is clicked, then the theme is changed accordingly

- **Logout**
  - When the **Logout** button in the header is clicked, then the Logout Popup will be displayed
    - When **Cancel** button is clicked, then the popup is closed
    - When **Confirm** button is clicked, then the page is navigated to the **Login** route

