import validator from "validator";

/**
 * Valida dados de login
 * @param {Object} data -
 * @returns {Object} 
 */
export function validateLogin(data) {
  const errors = {};

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "E-mail inválido.";
  }

  if (!data.password || data.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * @param {Object} data
 * @returns {Object}
 */
export function validateAmiibo(data) {
  const errors = {};

  if (!data.name || validator.isEmpty(data.name.trim())) {
    errors.name = "O nome do Amiibo é obrigatório.";
  }

  const validTypes = ["card", "figure", "other"];
  if (!data.type || !validTypes.includes(data.type)) {
    errors.type = "Tipo inválido. Use 'card', 'figure' ou 'other'.";
  }

  const validGames = ["mario", "sonic", "zelda", "metroid", "kirby"];
  if (!data.game || !validGames.includes(data.game)) {
    errors.game = "Jogo inválido. Use 'mario', 'sonic', 'zelda', 'metroid' ou 'kirby'.";
  }

  if (data.releaseDateJapan && !validator.isDate(data.releaseDateJapan)) {
    errors.releaseDateJapan = "Data de lançamento (Japão) inválida.";
  }

  if (data.releaseDateBrazil && !validator.isDate(data.releaseDateBrazil)) {
    errors.releaseDateBrazil = "Data de lançamento (Brasil) inválida.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
