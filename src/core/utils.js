export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "L'e-mail ne peut pas être vide.";
  if (!re.test(email)) return "Ooops!Nous avons besoin d'une adresse e-mail valide.";

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Le mot de passe ne peut pas être vide.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const nomValidator = nom => {
  if (!nom || nom.length <= 0) return 'Le nom ne peut pas être vide.';

  return '';
};

export const commentaireValidator = commentaire => {
  if (!commentaire || commentaire.length <= 0) return 'il faut saisir une description de problème';

  return '';
};

export const numeroValidator = numero => {
  if (!numero || numero.length != 8) return 'Le numero doit comporte 8 chiffres.';

  return '';
};

export const cinValidator = cin => {
  if (!cin || cin.length != 8) return 'Le cin doit comporte 8 chiffres.';

  return '';
};

export const localisationValidator = localisation => {
  if (!localisation || localisation.length <= 0) return 'localisation ne peut pas être vide.';

  return '';
};

export const descriptionValidator = description => {
  if (!description || description.length <= 0) return 'description ne peut pas être vide.';

  return '';
};
