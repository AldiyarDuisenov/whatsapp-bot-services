const getMessage = (client, message) => {
  if (message.body === "Консультация") {
    client.sendMessage(
      message.from,
      "Здравствуйте. Ваша заявка на консультацию принята. Как вам удобно переговорить устно или перепиской? Напишите 'Позвоните мне' или 'Напишите мне'"
    );
  }
};

export default getMessage;
