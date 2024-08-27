sequenceDiagram
    participant browser
    participant server
    %% to save a new note the bellow url will post it to server with code 302 found
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: SAVE New Note
    deactivate server
    %% after post success the below link GET display all the notes including the new post
    %% code 200 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML Document
    deactivate server
    %% GET Code 200
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    %% GET Code 200
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    %% GET Code 200
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "hi ben ", "date": "2024-08-26" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes