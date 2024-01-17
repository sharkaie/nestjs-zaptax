export default {
    JSON_LIMIT: '30kb',
    URL_ENCODED_LIMIT: '30kb',
    STATIC_DIR: 'public',
    SALT_ROUNDS: 12,
    PERMISSIONS: {
        AUTHENTICATION: '',
        MAILER_AUTHENTICATION: '',
    },
    RESOURCE_PERMISSIONS: [
        'createAny',
        'readAny',
        'updateAny',
        'deleteAny',
        'createOwn',
        'readOwn',
        'updateOwn',
        'deleteOwn',
    ],
};
