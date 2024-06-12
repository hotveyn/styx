export class ConfigError extends Error {
  constructor(
    configGroupName: string,
    configProperties: Record<string, unknown>,
  ) {
    super(
      ConfigError.getErrorMessageFromProperties(
        configGroupName,
        configProperties,
      ),
    );
  }

  static getErrorMessageFromProperties(
    configGroupName: string,
    configProperties: Record<string, unknown>,
  ): string {
    let message = `Missing some properties of ${configGroupName} env variables: \n`;

    for (const [key, value] of Object.entries(configProperties)) {
      message += `\t${key}: ${value}\n`;
    }

    return message;
  }
}
