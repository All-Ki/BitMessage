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
}