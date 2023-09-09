<?php
$_POST = json_decode(file_get_contents("php://input"), true);
      
if(empty($_POST['name']) ||
empty($_POST['phone']) ||
empty($_POST['communication-method']) )
{
   echo "No arguments Provided!";
   return false;
}

   $name = strip_tags(htmlspecialchars($_POST['name']));
   $phone = strip_tags(htmlspecialchars($_POST['phone']));
   $communicationMethod = strip_tags(htmlspecialchars($_POST['communication-method']));

      
   $to = 'support@lemurteam.ru';
   $email_subject = "Заявка с формы обратной связи от $name";
   $email_body = "Вы получили заявку от $name, номер телефона: $phone (способ связи: $communicationMethod).\n\n";
   $headers = "From: test@lemurteam.ru\n";
   $res = mail($to,$email_subject,$email_body,$headers);
   return $res;