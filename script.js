const data = {
    labels: ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw'],
    series: [4, 7, 5, 2]
};

const options = {
    axisX: {
        // Disable grid for this axis
        showGrid: false
    },
    axisY: {
        onlyInteger: true,
        labelInterpolationFnc: (value, index) => { // labelInterpolationFnc intercepts the value from the axis label so we can manipulate it
        return index % 2 === 0 ? value : null; // Only show the even numbers
    }
},
    distributeSeries: true, // Distributes values into different series and spread them along the axis
    high: 10 // Sets highest axis value
};

const trophy = 'assets/trophy.svg';
const chart = new Chartist.Bar('.ct-chart', data, options);

// Gets the higheset number in the array using the spread operator
const highest = Math.max(...data.series);

// Listen for draw events on the bar chart
chart.on('draw', (data) => {
    // If this draw event is of type bar we can use the data to create additional content
    if(data.type === 'bar') {

        // If the bar's y value is the highest, place the image. This will need to be modified if other images are added later
        if (data.value.y === highest) {
            const image = new Chartist.Svg('image', {
                x: data.x2 - 19, // Set coordinates for the image
                y: data.y2 - 53,
                'href': trophy
                });
            data.group.append(image);

            image.animate({
             opacity: {
                begin: 950,
                dur: 160,
                from: 0,
                to: 1,
            }
        });
        }  

        data.element.animate({
            y2: {
                dur: 400 * data.value.y/2, // Make the duration dependent on the y value
                from: data.y1,
                to: data.y2,
                easing: Chartist.Svg.Easing.easeOutExpo
            }

        });


    }

});