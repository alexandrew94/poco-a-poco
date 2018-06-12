# poco a poco API Documentation

### This is a guide to all the endpoints available in the API for *poco a poco*.

All fields listed under "Data Params" are required unless stated otherwise.

All endpoints except authentication endpoints require the user to be authenticated via a token in the request header. The token value can be acquired by logging in or signing up.

#### Required request header
* Header: `Authorization`
* Value: `Bearer some-token-value-1234567890`

---

## Contents

* [Authentication](#authentication)
  * [Login](#login)
  * [Sign Up](#sign-up)
* [Users](#users)
  * [Users Index](#users-index)
  * [Users Show](#users-show)

---

## <a name="authentication">Authentication</a>

#### <a name="login">Login</a>

Logs you in and gives you the token required for all non-authentication endpoints.

* URL: `/api/login`
* Method: `POST`
* Data Params:
  * `usernameOrEmail: 'string'`
  * `password: 'string'`
* Success Response:
  * Code: `200 Success`
  * Content:

	```javascript
	{
		"message": "Welcome back, Andrew! 😊😊",
		"token": "some-token-value-1234567890",
		"user": {
			"instruments": [
				{
					"name": "violin",
					"playingTime": 10
				},
				{
					"name": "piano",
					"playingTime": 20
				}
			],
			"_id": "abcdefg-1234567",
			"email": "someemail@someemail",
			"username": "Andrew",
			"accountCreated": "2018-05-20",
			"pieces": null,
			"id": "abcdefg-1234567"
		}
	}
	```
	\* Note that `pieces` is not populated here.
	
* Error Response:
  * Code: `401 Unauthorized`
  * Content:

	```javascript
	{
		"message": "Unauthorized"
	}
	```

#### <a name="sign-up">Sign Up</a>

Creates your account and gives you the token required for all non-authentication endpoints.

* URL: `/api/signup`
* Method: `POST`
* Data Params:
  * `username: 'string'` (must be unique)
  * `email: 'string@string'` (must be unique and have an @)
  * `password: 'string'`
  * `passwordConfirmation: 'string'`
  * `instruments: ['string', 'string', 'string']` (must at least have 1 instrument)
* Success Response:
  * Code: `200 Success`
  * Content:

	```javascript
	{
		"message": "You've successfully registered, Andrew! 👏🎉",
		"token": "some-token-value-1234567890",
		"user": {
			"instruments": [
				"violin",
				"piano"
			],
			"_id": "abcdefg-1234567",
			"username": "Andrew",
			"email": "someemail@someemail",
			"pieces": null,
			"id": "abcdefg-1234567"
		}
	}
	```
	\* Note that `pieces` is not populated here.
	
* Error Response:
  * Code: `422 Unprocessable Entity`
  * Content:

  	```javascript
	{
		"message": "Unprocessable Entity",
		"errors": {
			"email": "Some error message"
		}
	}
	```
	
## <a name="users">Users</a>

#### <a name="users-index">All Users</a>

Gets all data for all users. This particular endpoint is mostly for the purposes of getting a quick overview of all the users' data - no request is made to it from the front-end in ordinary use of the app.

* URL: `/api/users`
* Method: `GET`
* Success Response:
  * Code: `200 Success`
  * Content:

	```javascript
	[
		{
			"instruments": [
				{
					"name": "violin",
					"playingTime": 30
				},
				{
					"name": "piano",
					"playingTime": 30
				}
			],
			"_id": "abcdefg-1234567",
			"email": "a@a",
			"username": "a",
			"accountCreated": "2018-05-20",
			"__v": 0,
			"pieces": [
				{
					"_id": "abcdefg-1234567",
					"title": "piece1",
					"composer": "composer1",
					"description": "description1",
					"user": "abcdefg-1234567",
					"instrument": "piano",
					"startedAt": "2018-05-28",
					"diary": [
						{
							"_id": "abcdefg-1234567",
							"timeLogged": "2018-05-28",
							"timePracticed": 10,
							"notes": "diaryentry1",
							"id": "abcdefg-1234567",
							"shortNotes": "diaryentry1"
						},
						{
							"_id": "abcdefg-1234567",
							"timeLogged": "2018-05-27",
							"timePracticed": 20,
							"notes": "diaryentry2",
							"id": "abcdefg-1234567",
							"shortNotes": "diaryentry2"
						}
					],
					"__v": 0,
					"totalPracticed": 30,
					"shortDescription": "description1",
					"id": "abcdefg-1234567"
				},
				{
					"_id": "abcdefg-1234567",
					"title": "piece2",
					"composer": "composer2",
					"description": "description2",
					"instrument": "violin",
					"user": "abcdefg-1234567",
					"startedAt": "2018-05-24",
					"diary": [
						{
							"_id": "abcdefg-1234567",
							"timeLogged": "2018-05-26",
							"timePracticed": 10,
							"notes": "diaryentry3",
							"id": "abcdefg-1234567",
							"shortNotes": "diaryentry3"
						},
						{
							"_id": "abcdefg-1234567",
							"timeLogged": "2018-05-25",
							"timePracticed": 20,
							"notes": "diaryentry4",
							"id": "abcdefg-1234567",
							"shortNotes": "diaryentry4"
						}
					],
					"__v": 0,
					"totalPracticed": 30,
					"shortDescription": "description2",
					"id": "abcdefg-1234567"
				}
			],
			"totalPracticed": 60,
			"practiceLog": {
				"2018-05-28": 10,
				"2018-05-27": 20,
				"2018-05-26": 10,
				"2018-05-25": 20
			},
			"composersLog": {
				"composer1": 30,
				"composer2": 30
			},
			"id": "abcdefg-1234567"
		},
		{
			"instruments": [
				{
					"name": "violin",
					"playingTime": 0
				}
			],
			"_id": "abcdefg-1234567",
			"email": "b@b",
			"username": "b",
			"accountCreated": "2018-05-20",
			"__v": 0,
			"pieces": [
				{
					"_id": "abcdefg-1234567",
					"title": "piece3",
					"composer": "composer3",
					"description": "description3",
					"instrument": "violin",
					"startedAt": "2018-05-24",
					"user": "abcdefg-1234567",
					"diary": [],
					"__v": 0,
					"totalPracticed": 0,
					"shortDescription": "description3",
					"id": "abcdefg-1234567"
				},
				{
					"_id": "abcdefg-1234567",
					"title": "piece4",
					"composer": "composer4",
					"description": "description4",
					"instrument": "violin",
					"startedAt": "2018-05-24",
					"user": "abcdefg-1234567",
					"diary": [],
					"__v": 0,
					"totalPracticed": 0,
					"shortDescription": "description4",
					"id": "abcdefg-1234567"
				}
			],
			"totalPracticed": 0,
			"id": "abcdefg-1234567"
		},
		{
			"instruments": [
				{
					"name": "violin",
					"playingTime": 0
				}
			],
			"_id": "abcdefg-1234567",
			"email": "c@c",
			"username": "c",
			"accountCreated": "2018-05-20",
			"__v": 0,
			"pieces": [],
			"totalPracticed": 0,
			"id": "abcdefg-1234567"
		}
	]
	```
	
#### <a name="users-show">Users Show</a>

Shows all the data for a single user, giving more detailed practice data - the `practiceLog` and the `composersLog` for each user.

* URL: `/api/users/<userid>`
* Method: `GET`
* Success Response:
  * Code: `200 Success`
  * Content:

	```javascript
	{
		"instruments": [
			{
				"name": "violin",
				"playingTime": 30
			},
			{
				"name": "piano",
				"playingTime": 30
			}
		],
		"_id": "abcdefg-1234567",
		"email": "a@a",
		"username": "a",
		"accountCreated": "2018-05-20",
		"__v": 0,
		"pieces": [
			{
				"_id": "abcdefg-1234567",
				"title": "piece1",
				"composer": "composer1",
				"description": "description1",
				"user": "abcdefg-1234567",
				"instrument": "piano",
				"startedAt": "2018-05-28",
				"diary": [
					{
						"_id": "abcdefg-1234567",
						"timeLogged": "2018-05-28",
						"timePracticed": 10,
						"notes": "diaryentry1",
						"id": "abcdefg-1234567",
						"shortNotes": "diaryentry1"
					},
					{
						"_id": "abcdefg-1234567",
						"timeLogged": "2018-05-27",
						"timePracticed": 20,
						"notes": "diaryentry2",
						"id": "abcdefg-1234567",
						"shortNotes": "diaryentry2"
					}
				],
				"__v": 0,
				"totalPracticed": 30,
				"shortDescription": "description1",
				"id": "abcdefg-1234567"
			},
			{
				"_id": "abcdefg-1234567",
				"title": "piece2",
				"composer": "composer2",
				"description": "description2",
				"instrument": "violin",
				"user": "abcdefg-1234567",
				"startedAt": "2018-05-24",
				"diary": [
					{
						"_id": "abcdefg-1234567",
						"timeLogged": "2018-05-26",
						"timePracticed": 10,
						"notes": "diaryentry3",
						"id": "abcdefg-1234567",
						"shortNotes": "diaryentry3"
					},
					{
						"_id": "abcdefg-1234567",
						"timeLogged": "2018-05-25",
						"timePracticed": 20,
						"notes": "diaryentry4",
						"id": "abcdefg-1234567",
						"shortNotes": "diaryentry4"
					}
				],
				"__v": 0,
				"totalPracticed": 30,
				"shortDescription": "description2",
				"id": "abcdefg-1234567"
			}
		],
		"totalPracticed": 60,
		"practiceLog": {
			"2018-05-28": 10,
			"2018-05-27": 20,
			"2018-05-26": 10,
			"2018-05-25": 20
		},
		"composersLog": {
			"composer1": 30,
			"composer2": 30
		},
		"id": "abcdefg-1234567"
	}
	```