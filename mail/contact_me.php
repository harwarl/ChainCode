<?php
// Check for empty fields
if(empty($_POST['name']) ||
   empty($_POST['email']) ||
   empty($_POST['contact']) ||
   empty($_POST['job_title']) ||
   empty($_POST['company_name']) ||
   empty($_POST['country']) ||
   empty($_POST['project_name']) ||
   empty($_POST['message']) ||
   !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
{
    echo "No arguments Provided!";
    return false;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$contact = strip_tags(htmlspecialchars($_POST['contact']));
$job_title = strip_tags(htmlspecialchars($_POST['job_title']));
$company_name = strip_tags(htmlspecialchars($_POST['company_name']));
$country = strip_tags(htmlspecialchars($_POST['country']));
$project_name = strip_tags(htmlspecialchars($_POST['project_name']));
$language = strip_tags(htmlspecialchars($_POST['language']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Create the email and send the message
$to = 'oharwarl@gmail.com'; // The email address where the form will send a message.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n".
              "Here are the details:\n\n".
              "Name: $name\n\n".
              "Email: $email_address\n\n".
              "Contact: $contact\n\n".
              "Job Title: $job_title\n\n".
              "Company Name: $company_name\n\n".
              "Country: $country\n\n".
              "Project Name: $project_name\n\n".
              "Preferred Language: $language\n\n".
              "Message:\n$message";
$headers = "From: noreply@yourdomain.com\n"; // The email address the generated message will be from.
$headers .= "Reply-To: $email_address";	
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\n";

if(mail($to, $email_subject, $email_body, $headers)){
    echo "Message sent successfully!";
    return true;
} else {
    echo "Failed to send message.";
    return false;
}
?>
