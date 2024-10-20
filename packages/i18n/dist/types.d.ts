interface I18nMessage {
    account: {
        login: string;
        logout: string;
        register: string;
        username: string;
        password: string;
        confirmPassword: string;
        logoutConfirm: string;
        loginSuccess: string;
        registerSuccess: string;
    };
    server: {
        connectError: string;
        disconnect: string;
    };
    common: {
        sourceCode: string;
        language: string;
        setting: string;
        loading: string;
        searchPlaceholder: string;
        searchNoResult: string;
        create: string;
        search: string;
        add: string;
        searchPlaceholder2: string;
        toFindNewFriends: string;
        confirmToAdd: string;
        sendFriendRequestSuccess: string;
        noNotification: string;
        addYouAsFriend: string;
        reject: string;
        agree: string;
        confirm: string;
    };
    setting: {
        general: string;
        theme: string;
    };
    style: {
        theme: {
            default: string;
            cool: string;
        };
    };
    main: {
        chats: string;
        contacts: string;
        users: string;
        friends: string;
        groups: string;
        createGroup: string;
        addFriendOrGroup: string;
        inputGroupName: string;
        notifications: string;
        whetherAcceptFriend: string;
    };
    time: {
        today: string;
        yesterday: string;
    };
    validate: {
        required: string;
        maxLength: string;
        minLength: string;
        noWhitespace: string;
        notSameWithPassword: string;
    };
}

export { I18nMessage };
