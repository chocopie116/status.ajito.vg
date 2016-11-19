<?php

$result = [
    [
        'status' => 'green',
        'date_display' => '2016/10/31 21:40:00',
        'username' => 'anonymous',
        'message' => 'Everyone drinking normally.',
    ],
    [
        'status' => 'yellow',
        'date_display' => '2016/10/31 21:30:00',
        'username' => 'anonymous',
        'message' => 'active?',
    ],
    [
        'status' => 'red',
        'date_display' => '2016/10/31 21:40:00',
        'username' => 'annonymous',
        'message' => 'Noone drinking',
    ],
    [
        'status' => 'yellow',
        'date_display' => '2016/10/31 21:40:00',
        'username' => 'anonymous',
        'message' => 'active?',
    ],
];

echo json_encode($result);
