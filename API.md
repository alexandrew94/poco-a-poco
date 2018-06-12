# poco a poco API Documentation

### This is a guide to all the endpoints available in the API for *poco a poco*. All endpoints except authentication endpoints require the user to be authenticated via a token.
---

## Authentication

#### Login

* URL: `/api/login`
* Method: `POST`
* Data Params:
  * `usernameOrEmail: [String]`
  * `password: [String]`
* Success Response:
  * Code: `200`
  * Content:

```javascript
  {
	"message": "Welcome back, Andrew! 😊😊",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjEwNDZmOWVkNzhlNzdjZmY4MWFmMGUiLCJpYXQiOjE1Mjg4MTE1ODEsImV4cCI6MTUyODgzMzE4MX0.DmKexAUbP_WLfw5touwtU9qwGZymdAZPV3_tc94BIkI",
	"user": {
		"instruments": [
			{
				"name": "violin",
				"playingTime": 0
			},
			{
				"name": "piano",
				"playingTime": 0
			},
			{
				"name": "drums",
				"playingTime": 0
			},
			{
				"name": "voice",
				"playingTime": 0
			}
		],
		"_id": "5b1046f9ed78e77cff81af0e",
		"email": "a@a",
		"username": "Andrew",
		"accountCreated": "2018-05-20",
		"__v": 7,
		"pieces": null,
		"id": "5b1046f9ed78e77cff81af0e"
	}
}
```
 


Success 200

**Field** | **Value**
