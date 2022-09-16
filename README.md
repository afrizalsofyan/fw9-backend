<h1 align="center">OurPocket Backend</h1>
## About
A backend program for OurPocket Aplication.
## Contents

- [Link](#link)

- [How It Works](#how-it-works)

- [Endpoint](#endpoint)

## Link

- Link Vercel : https://fw9-backend.vercel.app/
- Link Cloudinary example : https://res.cloudinary.com/asadev619/image/upload/v1662925672/ourpocket/users/1662925672131.jpg

## How It Works ?

1. Clone this project to your local computer.
2. Install with node js with comment `npm i` then Create database and copy to your env.
3. Create Environtments in Postman & Set :

```bashPORT=3335
DATABASE_URL='YOUR DATABASE'
LIMIT_DATA=5 *default 5
BASE_PATH='your backend link'
APP_SECRET='YOUR SECRET APP KEY'
CLOUD_NAME = 'YOUR CLOUDE NAME CLOUDINARY'
API_KEY = 'YOUR API KEY CLOUDINARY'
API_SECRET = 'YOUR API KEY SECRET CLOUDINARY'
```
4. Running backend with `npm run dev`
5. Test Request

## EndPoint

### Module Auth

**Used for authentication**

| No. | Method | Endpoint                  | Information                      |
| --- | ------ | ------------------------- | -------------------------------- |
| 1.  | POST   | /auth/register            | Used for register new user.      |
| 2.  | POST   | /auth/login               | Used for login into app.         |
| 3.  | POST   | /auth/forgetPasswordLink  | Used for forgot password.        |
| 4.  | POST   | /auth/createPin           | Used for create pin.             |
| 5.  | PATCH  | /auth/reset-password      | Used for reseting password.      |
| 6.  | PATCH  | /auth/logout              | Used for logout from system.     |

### Module User

| No. | Method | Endpoint                                                                 | Information                                              |
| --- | ------ | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| 1.  | GET    | /user/currentUser                                                        | Used for get all data profiles of user.                  |
| 2.  | PATCH  | /profile                                                                 | Used for update profile user.                            |
| 3.  | PATCH  | /profile/phone                                                           | Used for change phone user.                              |
| 4.  | DEL    | /profile/photo                                                           | Used for delete photo user.                              |
| 5.  | PATCH  | /user/changePassword                                                     | Used for change password user.                           |
| 6.  | PATCH  | /user/changePin                                                          | Used for change pin user.                                |
| 7.  | GET    | /user/allUser?search=&sortBy=username&sortType=0&limit=10&page=1         | Used for get all user without current user.              |
| 8.  | GET    | /user/getUser/:id                                                        | Used for get details other users.                        |
| 9.  | POST   | /transactions/transfer                                                   | Used for transfer.                                       |
| 10. | PATCH  | /transactions/topup                                                      | Used for topup.                                          |
| 11. | GET    | /transactions/:id                                                        | Used for get details transaction.                        |
| 12. | GET    | /transactions/getAllTransaction?sortBy=amount&sortType=0&limit=5&page=1  | Used for get all transaction history.                    |
| 13. | GET    | /notification/reading                                                    | Used for notification withour read by user.              |
| 14. | PATCH  | /notification/:id                                                        | Used for remove notification from list all notification. |
| 15. | GET    | /notification/:id                                                        | Used for notification details.                           |

**For mobile Apps**
| No. | Method | Endpoint                         | Information                                                                              |
| --- | ------ | -------------------------------- | ---------------------------------------------------------------------------------------- |
| 1.  | POST   | /notification/fcm                | Used for create device token fcm (firebase token).                                       |
| 2.  | GET    | /notification/fcm                | Used for get all fcm token                                                               |
| 3.  | GET    | /notification/fcm/:token         | Used for get fcm token with specification.                                               |
