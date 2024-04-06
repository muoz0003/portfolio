function rdn_counter(itemClass, durationTime = 5) {
    const counters = document.querySelectorAll(itemClass);
    const speed = 150; // The lower the slower
    if (counters) {
        counters.forEach(counter => {
            const updateCount = () => {

                const target = +counter.getAttribute('data-end');
                const count = +counter.innerText;

                // Lower inc to slow and higher to slow
                const inc = target / speed;

                // console.log(inc);
                // console.log(count);

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, durationTime);
                } else {
                    counter.innerText = target;
                }

            };
            updateCount();
        })
    }
};