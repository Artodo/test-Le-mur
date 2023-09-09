<?php
var_dump($_POST);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';


$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);


$mail->addAddress('Tavebran@gmail.com', 'Artur Dyshynski');


$mail->addAddress('Tavebran@gmail.com');
$mail->Subject = 'Данные из формы';

$body = '<h1>Данные из формы "обратной связи"</h1>';

$body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';

$body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';

$body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';


$mail->Body = $body;

if (!$mail->send()) {
  $messsage = 'Ошибка';
} else {
  $messsage = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
