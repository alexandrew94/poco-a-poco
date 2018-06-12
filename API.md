# poco a poco API Documentation

### This is a guide to all the endpoints available in the API for *poco a poco*.

All endpoints except authentication endpoints require the user to be authenticated via a token in the request header. The token value can be acquired by logging in or signing up.

#### Required request header
* Header: `Authorization`
* Value: `Bearer some-token-value-1234567890`

---

## Authentication

#### Login

Logs you in and gives you the token required for all non-authentication endpoints.

* URL: `/api/login`
* Method: `POST`
* Data Params:
  * `usernameOrEmail: [String]`
  * `password: [String]`
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
	
* Error Response:
  * Code: `401 Unauthorized`
  * Content:

	```javascript
	{
		"message": "Unauthorized"
	}
	```

#### Sign Up

Creates your account and gives you the token required for all non-authentication endpoints.

* URL: `/api/signup`
* Method: `POST`
* Data Params:
  * `username: [String]` (must be unique)
  * `email: [String]` (must be unique and have an @)
  * `password: [String]`
  * `passwordConfirmation: [String]`
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
	
## Users

#### All Users

Gets all data for all users.

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
			"_id": "5b1fdbabc6e9c3d2e8444e61",
			"email": "a@a",
			"username": "a",
			"accountCreated": "2018-05-20",
			"__v": 0,
			"pieces": [
				{
					"_id": "5b1fdbabc6e9c3d2e8444e64",
					"title": "piece1",
					"composer": "composer1",
					"description": "description1",
					"user": "5b1fdbabc6e9c3d2e8444e61",
					"instrument": "piano",
					"startedAt": "2018-05-28",
					"diary": [
						{
							"_id": "5b1fdbabc6e9c3d2e8444e66",
							"timeLogged": "2018-05-28",
							"timePracticed": 10,
							"notes": "diaryentry1",
							"id": "5b1fdbabc6e9c3d2e8444e66",
							"shortNotes": "diaryentry1"
						},
						{
							"_id": "5b1fdbabc6e9c3d2e8444e65",
							"timeLogged": "2018-05-27",
							"timePracticed": 20,
							"notes": "diaryentry2",
							"id": "5b1fdbabc6e9c3d2e8444e65",
							"shortNotes": "diaryentry2"
						}
					],
					"__v": 0,
					"totalPracticed": 30,
					"shortDescription": "description1",
					"id": "5b1fdbabc6e9c3d2e8444e64"
				},
				{
					"_id": "5b1fdbabc6e9c3d2e8444e67",
					"title": "piece2",
					"composer": "composer2",
					"description": "description2",
					"instrument": "violin",
					"user": "5b1fdbabc6e9c3d2e8444e61",
					"startedAt": "2018-05-24",
					"diary": [
						{
							"_id": "5b1fdbabc6e9c3d2e8444e69",
							"timeLogged": "2018-05-26",
							"timePracticed": 10,
							"notes": "diaryentry3",
							"id": "5b1fdbabc6e9c3d2e8444e69",
							"shortNotes": "diaryentry3"
						},
						{
							"_id": "5b1fdbabc6e9c3d2e8444e68",
							"timeLogged": "2018-05-25",
							"timePracticed": 20,
							"notes": "diaryentry4",
							"id": "5b1fdbabc6e9c3d2e8444e68",
							"shortNotes": "diaryentry4"
						}
					],
					"__v": 0,
					"totalPracticed": 30,
					"shortDescription": "description2",
					"id": "5b1fdbabc6e9c3d2e8444e67"
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
			"id": "5b1fdbabc6e9c3d2e8444e61"
		},
		{
			"instruments": [
				{
					"name": "violin",
					"playingTime": 0
				}
			],
			"_id": "5b1fdbabc6e9c3d2e8444e62",
			"email": "b@b",
			"username": "b",
			"accountCreated": "2018-05-20",
			"__v": 0,
			"pieces": [
				{
					"_id": "5b1fdbabc6e9c3d2e8444e6a",
					"title": "piece3",
					"composer": "composer3",
					"description": "description3",
					"instrument": "violin",
					"startedAt": "2018-05-24",
					"user": "5b1fdbabc6e9c3d2e8444e62",
					"diary": [],
					"__v": 0,
					"totalPracticed": 0,
					"shortDescription": "description3",
					"id": "5b1fdbabc6e9c3d2e8444e6a"
				},
				{
					"_id": "5b1fdbabc6e9c3d2e8444e6b",
					"title": "piece4",
					"composer": "composer4",
					"description": "description4",
					"instrument": "violin",
					"startedAt": "2018-05-24",
					"user": "5b1fdbabc6e9c3d2e8444e62",
					"diary": [],
					"__v": 0,
					"totalPracticed": 0,
					"shortDescription": "description4",
					"id": "5b1fdbabc6e9c3d2e8444e6b"
				}
			],
			"totalPracticed": 0,
			"id": "5b1fdbabc6e9c3d2e8444e62"
		},
		{
			"instruments": [
				{
					"name": "violin",
					"playingTime": 0
				}
			],
			"_id": "5b1fdbabc6e9c3d2e8444e63",
			"email": "c@c",
			"username": "c",
			"accountCreated": "2018-05-20",
			"__v": 0,
			"pieces": [],
			"totalPracticed": 0,
			"id": "5b1fdbabc6e9c3d2e8444e63"
		}
	]
	```