/**
 * Serviço de criptografia para dados sensíveis
 *
 * Este módulo fornece funções para criptografar e descriptografar dados sensíveis
 * usando algoritmos seguros.
 */

// Função para gerar uma chave de criptografia a partir de uma senha
export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  // Converter a senha para um formato que pode ser usado pela API Web Crypto
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)

  // Importar a senha como uma chave
  const baseKey = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2" }, false, ["deriveKey"])

  // Derivar uma chave AES-GCM a partir da senha
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  )
}

// Função para criptografar dados
export async function encryptData(data: string, password: string): Promise<string> {
  try {
    // Gerar um vetor de inicialização (IV) aleatório
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Gerar um salt aleatório
    const salt = crypto.getRandomValues(new Uint8Array(16))

    // Derivar uma chave a partir da senha
    const key = await deriveKey(password, salt)

    // Converter os dados para um formato que pode ser criptografado
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)

    // Criptografar os dados
    const encryptedBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, dataBuffer)

    // Combinar o salt, IV e dados criptografados em um único buffer
    const result = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength)
    result.set(salt, 0)
    result.set(iv, salt.length)
    result.set(new Uint8Array(encryptedBuffer), salt.length + iv.length)

    // Converter o buffer para uma string base64
    return btoa(String.fromCharCode(...result))
  } catch (error) {
    console.error("Erro ao criptografar dados:", error)
    throw new Error("Falha ao criptografar dados")
  }
}

// Função para descriptografar dados
export async function decryptData(encryptedData: string, password: string): Promise<string> {
  try {
    // Converter a string base64 para um buffer
    const encryptedBuffer = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0))

    // Extrair o salt, IV e dados criptografados do buffer
    const salt = encryptedBuffer.slice(0, 16)
    const iv = encryptedBuffer.slice(16, 28)
    const data = encryptedBuffer.slice(28)

    // Derivar a chave a partir da senha e do salt
    const key = await deriveKey(password, salt)

    // Descriptografar os dados
    const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data)

    // Converter o buffer descriptografado para uma string
    const decoder = new TextDecoder()
    return decoder.decode(decryptedBuffer)
  } catch (error) {
    console.error("Erro ao descriptografar dados:", error)
    throw new Error("Falha ao descriptografar dados")
  }
}

// Função para hash seguro de senhas
export async function hashPassword(password: string): Promise<string> {
  // Gerar um salt aleatório
  const salt = crypto.getRandomValues(new Uint8Array(16))

  // Converter a senha para um formato que pode ser usado pela API Web Crypto
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)

  // Concatenar o salt e a senha
  const passwordWithSalt = new Uint8Array(salt.length + passwordBuffer.length)
  passwordWithSalt.set(salt, 0)
  passwordWithSalt.set(passwordBuffer, salt.length)

  // Calcular o hash da senha com o salt
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordWithSalt)

  // Combinar o salt e o hash em um único buffer
  const result = new Uint8Array(salt.length + hashBuffer.byteLength)
  result.set(salt, 0)
  result.set(new Uint8Array(hashBuffer), salt.length)

  // Converter o buffer para uma string base64
  return btoa(String.fromCharCode(...result))
}

// Função para verificar uma senha
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    // Converter a string base64 para um buffer
    const storedBuffer = Uint8Array.from(atob(hashedPassword), (c) => c.charCodeAt(0))

    // Extrair o salt e o hash do buffer
    const salt = storedBuffer.slice(0, 16)
    const storedHash = storedBuffer.slice(16)

    // Converter a senha para um formato que pode ser usado pela API Web Crypto
    const encoder = new TextEncoder()
    const passwordBuffer = encoder.encode(password)

    // Concatenar o salt e a senha
    const passwordWithSalt = new Uint8Array(salt.length + passwordBuffer.length)
    passwordWithSalt.set(salt, 0)
    passwordWithSalt.set(passwordBuffer, salt.length)

    // Calcular o hash da senha com o salt
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordWithSalt)
    const calculatedHash = new Uint8Array(hashBuffer)

    // Comparar os hashes
    if (storedHash.length !== calculatedHash.length) {
      return false
    }

    // Comparação segura contra ataques de timing
    let result = 0
    for (let i = 0; i < storedHash.length; i++) {
      result |= storedHash[i] ^ calculatedHash[i]
    }

    return result === 0
  } catch (error) {
    console.error("Erro ao verificar senha:", error)
    return false
  }
}

