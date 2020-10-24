(function() { // Immediately invoke function
    // Get Soda form
    const $form = $('#soda-form');
    // Declare api server for soda
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
            renderSodas(res);
        })
    }
    // Call api sodas
    getSodas();

   // Render sodas from the ajax request
   function renderSodas({sodas}) {
       const $sodaDiv = $('#sodas');
       // Loop through the sodas array 
        sodas.map((soda, idx) => {
            // Append new elements under sodas' container
            $sodaDiv.append(`
                <div id=${soda._id}>
                    <h5>
                        <a class="soda-link" href="/soda/${soda._id}">${soda.name}</a>
                    </h5>
                </div>
            `);
        });
   }

    // Attach event handler to form
    $form.submit((e) => {
        e.preventDefault();
        // Data object for server parsing
        const data = {
            // Get name of soda and assign it to object
            name: e.target.name.value,
            // Get brand of soda and assign it to object
            brand:e.target.brand.value,
            // Get fizziness of soda and assign it to object
            fizziness: e.target.fizziness.value,
            // Get rating of soda and assign it to object
            taste_rating: e.target.taste_rating.value
        }
        // Make an ajax post request to server and send
        // the data from the form object
        $.ajax({
            type:"POST",
            url: apiServerSoda,
            data: data
        })
        .done(msg => {
            alert('Successfully saved!');
        })
    });
})();
