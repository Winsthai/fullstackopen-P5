### Covered:

- Connecting login functionality of backend to frontend by triggering HTTP requests on frontend form submits and conditionally rendering
- Using localStorage to save and retrieve information quickly in the browser
- Using props.children for referencing the child components of a component
- Separating each aspect of the page into components and managing their states accordingly (through the closest common parent)
- PropTypes package to make components have required props
- Utilizing a linter (ESlint) to keep code organized
- Testing react programs by with multiple libraries:
  - Using **Vitest with the jsdom library** to simulate a web browser
  - Using **react-testing-library with the jest-dom library** for testing the content and rendering of components
    - Render function to render components
    - Screen object to get content or use screen.debug() function to print HTML to console
    - Using companion library **user-event** to simulate user input
