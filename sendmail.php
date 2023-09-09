<?php
var_dump($_POST);
$_POST = json_decode(file_get_contents("php://input"), true);
      
if(empty($_POST['firstName']) ||
empty($_POST['email']) ||
empty($_POST['phone']) ||
!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
{
   echo "No arguments Provided!";
   return false;
}

   $firstName = strip_tags(htmlspecialchars($_POST['firstName']));
   $lastName = strip_tags(htmlspecialchars($_POST['lastName']));
   $email_address = strip_tags(htmlspecialchars($_POST['email']));
   $phone = strip_tags(htmlspecialchars($_POST['phone']));
   $city = strip_tags(htmlspecialchars($_POST['city']));
   $tour = strip_tags(htmlspecialchars($_POST['tour']));
   $date = strip_tags(htmlspecialchars($_POST['date']));
   $type = "";
   $survey = "";
   
   if($_POST['isExtrim'] === 'true') {
      $type = "экстремальный";
      $survey = "Анкета";
   } else {
      $type = "неэкстремальный";
   }
   
      
   $to = 'Tavebran@gmail.com';
   $email_subject = "Заявка с сайта Viking Travel от пользователя $firstName $lastName";
   $email_body = "Вы получили бронь на $type тур $tour на сайте.\n\n"."Имя: $firstName $lastName\nEmail: $email_address\nГород: $city\nТелефон: $phone\nТур: $tour\nДата: $date \n\n\n$survey";
   $headers = "From: noreply@viking-travels.com\n";
   $headers .= "Reply-To: $email_address";   
   $res = mail($to,$email_subject,$email_body,$headers);
   return $res;


// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'path/to/PHPMailer/src/Exception.php';
// require 'path/to/PHPMailer/src/PHPMailer.php';
// require 'path/to/PHPMailer/src/SMTP.php';


// $mail = new PHPMailer(true);
// $mail->CharSet = 'UTF-8';
// $mail->setLanguage('ru', 'phpmailer/language/');
// $mail->IsHTML(true);


// $mail->addAddress('Tavebran@gmail.com', 'Artur Dyshynski');


// $mail->addAddress('Tavebran@gmail.com');
// $mail->Subject = 'Данные из формы';

// $body = '<h1>Данные из формы "обратной связи"</h1>';

// $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';

// $body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';

// $body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';


// $mail->Body = $body;

// if (!$mail->send()) {
//   $messsage = 'Ошибка';
// } else {
//   $messsage = 'Данные отправлены!';
// }

// $response = ['message' => $message];

// header('Content-type: application/json');
// echo json_encode($response);
