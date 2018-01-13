# Solution
## Features:

###### Customer list could be uploaded with .txt file.
###### Simple form validations.
###### Multiple file upload.
###### Security configs with rack attack configuration (limit/request).You could also configure for CORS.
###### Caching.

#### Important! for production files could be loaded to some cloud service.

## To run server app:

```bundle install
bundle exec rake db:create (within bundle)
bundle exec rake db:migrate
redis-server
bundle exec sidekiq
bundle exec rails s
```
## To run server test suit:

```bundle exec rake db:test:prepare
redis-server
bundle exec rspec
```
## To run frontend app:
```
cd frontend
npm install
npm start
```
## Algorithm:

- After .txt file was successfully uploaded its being parsed.
- Fetching customer lists in invitation.rb model.
- Iterating over each customer list and calculating distance in location.rb Concern.
-
