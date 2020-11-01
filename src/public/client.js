// Main data storage object, uses Immutable for the rover list
let store = {
    roverSelected: '',
    data: '',
    rovers: Immutable.List(['Spirit', 'Opportunity', 'Curiosity']),
}

// add our markup to the page
const root = document.getElementById('root')

const storeUpdate = (newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {

    return `
        <header><h2>Simple Mars Rover Dashboard</h2></header>
        <main>
            <section>
                ${RoverData(state)}
            </section>
        </main>
        <footer>
            <h3><u>Fact: </u> <i>Mars is the only planet solely inhabited by robots!!</i></h3>
        </footer>
    `
}

window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

const RoverData = (state) => {

    // If no rover is selected in state, create the rover card HTML with 
    // wrapInDivFunction and return
    if (!state.roverSelected) {
        return (`
            ${wrappingDivFunction(state, 'rover-container', joinMapperFunction,
            state.rovers, roverCardMaker)}
        `)
    }

    // If a rover is selected but there's no data yet, call the API with
    // getRoverData and return
    // getRoverData will call the updateStore function, which calls this
    // function again, so returning immediately after prevents errors in
    // console with undefined data
    if (!state.data) {
        getRoverData(state)
        return ''
    }

    // Array of photos from the rover
    const { photos } = state.data.results

    // Map the photo array to get the URLs of the photos
    const photoURL = photos.map(photo => photo.img_src)

    // All photos will be from the same date, so use photo[0]
    const photoDate = state.data.results.photos[0].earth_date

    // Get the required mission data
    const { name, launch_date, landing_date, status } =
        state.data.results.photos[0].rover

    // Makes the information HTML and calls wrapInDivFunction to start the
    // production of the photo array
    return (`
        <ul class="info-container">
            <li>Name of the Rover: ${name}</li>
            <li>Date of Launch from Earth: ${launch_date}</li>
            <li>Date of Landing on Mars: ${landing_date}</li>
            <li>Status of the Mission: ${status}</li>
            <li>Photos taken by ${name} : ${photoDate}</li>
        </ul>
        <button onclick="storeUpdate({roverSelected: '', data: ''})" class="back-button">Back</button>
        ${wrappingDivFunction(state, 'photo-container', joinMapperFunction,
        photoURL, photoElementMakerFunction)}
        <button onclick="storeUpdate({roverSelected: '', data: ''})" class="back-button">Back</button>
    `)
}

// --------------- COMPONENT HELPER FUNCTIONS, INCLUDING HIGHER-ORDER FUNCTIONS

/**
 * @description Higher-order function to wrap elements of mapped array in a div
 * In this project it is used to make containers for the rover cards and photos
 * @param {string} divClass Name of the class that will be assigned to the div
 * @param {function} mapperFunction Function that will do the mapping
 * @param {Array} mapThis The array that will be mapped
 * @param {function} elementMakerFunction Function to create the element HTML
 */
const wrappingDivFunction = (state, divClass, mapperFunction, mapThis, elementMakerFunction) => {
    return (`
    <div class="${divClass}">
        ${mapperFunction(state, mapThis, elementMakerFunction)}
    </div >
    `)
}

/**
 * @description Higher-order function to make a joined map
 * In this project it is used to make arrays of rover cards and photos and join
 * @param {Array} mapThis The array to be mapped and joined
 * @param {function} elementMakerFunction Function to use for mapping
 */
const joinMapperFunction = (state, mapThis, elementMakerFunction) => {
    return (`
        ${mapThis.map(x => elementMakerFunction(state, x)).join('')}
    `)
}

/**
 * @description Makes button HTML for a rover card on main UI
 * @param {string} rover Name of the rover
 * @returns Button HTML
 */
const roverCardMaker = (state, rover) => {
    return (`
    <button class="rover-card"
    onclick="setTimeout(storeUpdate, 3000, {roverSelected: '${rover}'})">
    <h2 class="card-title">${rover}</h2>
    </button>
    `)
}

/**
 * @description Makes image tag HTML for a photo URL
 * @param {string} url URL of the photo
 * @returns Image tag HTML
 */
const photoElementMakerFunction = (state, url) => {
    return (`
    <img class="photo" src="${url}" alt="Photo taken on Mars by 
    ${state.selectedRover}"/>
    `)
}

// ------------------------------------------------------  API CALLS

const getRoverData = (state) => {
    const { roverSelected } = state

    fetch(`/${roverSelected}`)
        .then(res => res.json())
        .then(data => storeUpdate({ data }))
}