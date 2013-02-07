{
  "header": {
    "status":"<?= $status; ?>",
    "message": "<?= empty($message) ? '' : $message; ?>"
  },
  "body": <?php echo empty($data) ? "{}" : json_encode($data, JSON_UNESCAPED_UNICODE); ?>
}
