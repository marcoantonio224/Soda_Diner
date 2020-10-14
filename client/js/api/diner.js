(function() {
    // Get Diner form
    const $form = $('#diner-form');
    // Get sodas container for diners 
    const $sodasContainer = $("#sodas-container");
    // Declare api server for diner
    const apiServerDiner = "http://localhost:3000/diner";
    // Declare api server for diner
    const apiServerSoda = "http://localhost:3000/sodas";
    // Get the sodas for soda form
    function getSodas() {
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
        for(let obj of data.sodas) {
            $sodasContainer.append(`
                <option value=${obj._id}> ${obj.name} </option>
            `);
        }
    }
    // Attach event handler to form
    $form.submit((e) => {
        e.preventDefault();
        // Get sodas from multiple select box
        const sodas = $("select[name='sodas']").val();
        console.log(sodas)
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
            alert('Successfully sent!');
        })
    });
})();
