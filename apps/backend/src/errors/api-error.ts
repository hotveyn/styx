enum ApiErrorType {
  UNIQUE = 'UNIQUE',
  NOT_FOUND = 'NOT_FOUND',
  AUTH = 'AUTH',
  DELETE = 'DELETE',
  FORBIDDEN = 'FORBIDDEN',
}

export class ApiError {
  type: ApiErrorType;
  thing: string;
  message: string;

  constructor(type: ApiErrorType, thing: string, message: string) {
    this.thing = thing;
    this.message = message;
    this.type = type;
  }

  static condition(someError: any): someError is ApiError {
    return someError.thing && someError.message && someError.type;
  }
}

export const ApiErrors = {
  organization: {
    unique: {
      name: new ApiError(
        ApiErrorType.UNIQUE,
        'ORGANIZATION_NAME',
        'Organization with this name already exists',
      ),
    },
    notFound: {
      id: new ApiError(
        ApiErrorType.NOT_FOUND,
        'ORGANIZATION_ID',
        'Organization with this id dit not find',
      ),
    },
    delete: {
      users: new ApiError(
        ApiErrorType.DELETE,
        'ORGANIZATION_USERS',
        'Organization has some users',
      ),
      devices: new ApiError(
        ApiErrorType.DELETE,
        'ORGANIZATION_DEVICES',
        'Organization has some devicess',
      ),
      goals: new ApiError(
        ApiErrorType.DELETE,
        'ORGANIZATION_GOALS',
        'Organization has some goals',
      ),
    },
    forbidden: new ApiError(
      ApiErrorType.FORBIDDEN,
      'ORGANIZATION_FORBIDDEN',
      "You haven't acces to this organization",
    ),
  },
  device: {
    unique: {
      code: new ApiError(
        ApiErrorType.UNIQUE,
        'DEVICE_CODE',
        'Device with this code already exist',
      ),
    },
    notFound: {
      id: new ApiError(
        ApiErrorType.NOT_FOUND,
        'DEVICE_ID',
        'Device with this id did not find',
      ),
      code: new ApiError(
        ApiErrorType.NOT_FOUND,
        'DEVICE_CODE',
        'Device with this code did not find',
      ),
    },
  },
  speech: {
    notFound: {
      id: new ApiError(
        ApiErrorType.NOT_FOUND,
        'DEVICE_ID',
        'Device with this id did not find',
      ),
    },
  },
  failure: {
    notFound: {
      id: new ApiError(
        ApiErrorType.NOT_FOUND,
        'DEVICE_FAILURE_ID',
        'Device failure with this id did not find',
      ),
    },
  },
  failureNotification: {
    unique: {
      id: new ApiError(
        ApiErrorType.UNIQUE,
        'FAILURE_NOTIFICATION',
        'Failure notification already exist',
      ),
    },
  },
  user: {
    unique: {
      login: new ApiError(
        ApiErrorType.UNIQUE,
        'USER_LOGIN',
        'User with this login already exist',
      ),
      email: new ApiError(
        ApiErrorType.UNIQUE,
        'USER_EMAIL',
        'User with this email already exist',
      ),
    },
    notFound: {
      id: new ApiError(
        ApiErrorType.NOT_FOUND,
        'USER_ID',
        'User with this id dit not find',
      ),
      login: new ApiError(
        ApiErrorType.NOT_FOUND,
        'USER_LOGIN',
        'User with this login dit not find',
      ),
    },
    auth: new ApiError(ApiErrorType.AUTH, 'USER_AUTH', 'Authentication failed'),
    selfDelete: new ApiError(
      ApiErrorType.DELETE,
      'USER_DELETE',
      'User tried to delete himself',
    ),
  },
  goal: {
    unique: {
      code: new ApiError(
        ApiErrorType.UNIQUE,
        'GOAL_CODE',
        'Goal with this code already exist',
      ),
    },
    notFound: {
      id: new ApiError(
        ApiErrorType.NOT_FOUND,
        'GOAL_ID',
        'Goal with this id did not find',
      ),
      code: new ApiError(
        ApiErrorType.NOT_FOUND,
        'GOAL_CODE',
        'Goal with this code did not find',
      ),
    },
  },
  application: {
    unique: {
      name: new ApiError(
        ApiErrorType.UNIQUE,
        'APPLICATION_NAME',
        'Application with this name already exist',
      ),
    },
    notFound: {
      name: new ApiError(
        ApiErrorType.NOT_FOUND,
        'APPLICATION_NAME',
        'Application with this name did not find',
      ),
    },
  },
  camera: {
    notFound: {
      id: new ApiError(
        ApiErrorType.NOT_FOUND,
        'CAMERA_ID',
        'Camera with this id did not find',
      ),
    },
  },
  dadata: {
    notFound: {
      suggestion: new ApiError(
        ApiErrorType.NOT_FOUND,
        'DADATA_SUGGESTION',
        'No one suggestion found',
      ),
    },
  },
  notification: {
    notFound: {
      userId: new ApiError(
        ApiErrorType.NOT_FOUND,
        'NOTIFICATION_USERID',
        'There is no subscription of authed user',
      ),
    },
  },
};

export function getApiErrorToOpenApiSchema(...e: ApiError[]) {
  if (e.length === 1) {
    return {
      schema: {
        type: 'object',
        example: e[0],
        properties: {
          type: {
            type: 'string',
            enum: [e[0].type],
          },
          message: {
            type: 'string',
            enum: [e[0].message],
          },
          thing: {
            type: 'string',
            enum: [e[0].thing],
          },
        },
      },
    };
  }

  return {
    schema: {
      oneOf: e.map((error) => {
        return {
          type: 'object',
          example: error,
          properties: {
            type: {
              type: 'string',
              enum: [error.type],
            },
            message: {
              type: 'string',
              enum: [error.message],
            },
            thing: {
              type: 'string',
              enum: [error.thing],
            },
          },
        };
      }),
    },
  };
}
