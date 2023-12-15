let components = [
    [
        'ChangedChoice', 'float.PositiveInfinity', 'Choice',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'ChangedResponse', 'float.PositiveInfinity', 'Response',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'Event', 'float.PositiveInfinity', 'Any',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'Interruptable', '1', 'Response',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'LockedChoice', 'float.PositiveInfinity', 'Choice',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'Log', 'float.PositiveInfinity', 'Any',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'PortraitChange', 'float.PositiveInfinity', 'Any',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'RandomizedChoice', '1', 'Choice',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'RelationshipChange', 'float.PositiveInfinity', 'Any',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'StatisticChange', 'float.PositiveInfinity', 'Any',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'StatisticReveal', 'float.PositiveInfinity', 'Any',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'TimedChoice', '1', 'Choice',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
    [
        'TopicChange', 'float.PositiveInfinity', 'Response',
        'description',
        [
            'variable1', 'variable1 description',
            'variable2', 'variable2 description',
            'variable3', 'variable3 description',
        ],
        'disclaimers'
    ],
];

window.onload = function () {
    let components_parent = document.getElementById('components');

    for (let i in components) {
        let component = document.createElement('div');
        component.setAttribute('class', 'flex column start component');
        components_parent.appendChild(component);

        let variables = '';

        for (let j = 0; j < components[i][4].length; j++)
            if (j % 2 === 0) variables += '<p><strong>' + components[i][4][j] + '</strong>: ' + components[i][4][j + 1] + '</p>';

        component.innerHTML =
            '<h3 style="text-decoration: underline;"><strong>' + components[i][0] + '</strong></h3>' +
            '<p><strong>Max Quantity:</strong> ' + components[i][1] + '</p>' +
            '<p><strong>Node Type(s):</strong> ' + components[i][2] + '</p>' +
            '<p>' + components[i][3] + '</p>' +
            variables +
            '<p>' + components[i][5] + '</p>';
    }
};