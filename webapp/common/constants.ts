export class CONSTANTS{
	public static readonly discussion_list_page = 'discussion-list';
	public static readonly chat_page = 'chat';
	public static readonly login_page = 'login';
	public static readonly settings_page = 'settings';
	public static readonly contacts_list_page = 'contacts-list';
	public static readonly contact_details_page = 'contact-details';
	public static readonly new_contact_page = 'new-contact';
	public static readonly new_discussion_page = 'new-discussion';



	public static readonly Networks =[
		{
			name: 'BitMessage',
			protocol: 'BitMessage',
			url: 'http://localhost:5000',
		},
		{
			name: 'Ethereum',
			protocol: 'Ethereum',
			url: 'http://localhost:8545',
		},
		{
			name: 'Bitcoin',
			protocol: 'Bitcoin',
			url: 'http://localhost:8332',
		}

	]

	public static readonly Actions = {
		update_settings: 'update_settings',
		get_settings: 'get_settings',
		get_contacts: 'get_contacts',
		update_contacts: 'update_contacts',
		send_message: 'send_message',
		get_messages: 'get_messages',
		get_discussions: 'get_discussions',
		login: 'login',
	}

  public static getActionFromUrl(url: string): string | undefined {
    const matchedMapping = urlToActionMap.find(mapping => {
      const re = new RegExp('^' + mapping.url.replace(/:[^\s/]+/g, '([^/]+)') + '$');
      return re.test(url);
    });

    return matchedMapping ? matchedMapping.action : undefined;
  }
}
	// Create a list of objects mapping URL to action
	const urlToActionMap = [
		{
		  url: '/messages',
		  action: CONSTANTS.Actions.send_message
		},
		{
		  url: '/messages/:receiver/:sender',
		  action: CONSTANTS.Actions.get_messages
		},
		{
		  url: '/discussions/:user',
		  action: CONSTANTS.Actions.get_discussions
		},
		{
		  url: '/login',
		  action: CONSTANTS.Actions.login
		},
		{
		  url: '/user_settings',
		  action: CONSTANTS.Actions.update_settings
		},
		{
		  url: '/contacts',
		  action: CONSTANTS.Actions.update_contacts
		},
		{
		  url: '/nonce',
		  action: CONSTANTS.Actions.get_nonce
		},
		// Add more mappings as needed
	  ];
