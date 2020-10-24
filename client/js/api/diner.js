(function() { // Immediately invoke function
    // Get Diner form
    const $form = $('#diner-form');
    // Diner container 
    const $dinersContainer = $("#diners-container");
    // Get sodas container for diners 
    const $sodasContainer = $("#sodas-container");
    // Declare api server for requesting all diners
    const apiServerDiners = "http://localhost:3000/diners";
    // Declare api server for creating new diner
    const apiServerDiner = "http://localhost:3000/diner";
    // Declare api server for requesting sodas
    const apiServerSoda = "http://localhost:3000/sodas";
    // Get the sodas for soda form
    function getSodas() {
        // Get sodas
        $.ajax({
            type:"GET",
            url: apiServerSoda
        })
        .done(res => {
            // Render option elements for soda
            renderOptionElements(res);
        })
    }
    // Call api sodas
    getSodas();

    // Function render soda elements
    function renderOptionElements(data) {
        // Loop thru the data
        for(let obj of data.sodas) {
            // Append the options for select box
            $sodasContainer.append(`
                <option value=${obj._id}> ${obj.name} </option>
            `);
        }
    }

    // Request all diners from server
    function getDiners() {
        // Get sodas
        $.ajax({
            type:"GET",
            url: apiServerDiners
        })
        .done(res => {
            // Render option elements for soda
            renderDiners(res);
        })
    }
    // Render diners on page
    function renderDiners({diners}) {
        const $sodaDiv = $('#diners');
        // Loop through the sodas array 
         diners.map((diner, idx) => {
             // Append new elements under sodas' container
             $sodaDiv.append(`
                 <div id=${diner._id}>
                     <h5>
                         <a class="diner-link" href="/diner/${diner._id}">${diner.name}</a>
                     </h5>
                 </div>
             `);
         });
    }

    // Call getDiners
    getDiners();
    
    // Attach event handler to form
    $form.submit((e) => {
        e.preventDefault();
        // Get sodas from multiple select box
        const sodas = $("select[name='sodas']").val();
        // Data object for server parsing
        const data = {
            // Get name of diner and assign it to object
            name: e.target.name.value,
            // Get location of diner and assign it to object
            location: e.target.location.value,
            // Get sodas of diner and assign it to object
            sodas: sodas
        }
        // Make an ajax post request to server and send
        // the data from the form object
        $.ajax({
            type:"POST",
            url: apiServerDiner,
            data: data
        })
        .done(msg => {
            console.log(msg)
            alert('Successfully saved!');
        })
    });
})();
