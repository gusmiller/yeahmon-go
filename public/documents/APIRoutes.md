# 18 NoSQL: Social Network API

## API Routes
**`/api/users`**
* <span style="color:brown">`GET` all users</span>
* <span style="color:brown">`GET` a single user by its `_id` and populated thought and friend data</span>
* <span style="color:brown">`POST` a new user:</span>
* <span style="color:brown">`PUT` to update a user by its `_id`</span>
* <span style="color:brown">`DELETE` to remove user by its `_id`</span>

**BONUS**: Remove a user's associated thoughts when deleted.
---
**`/api/users/:userId/friends/:friendId`**
* <span style="color:brown">`POST` to add a new friend to a user's friend list</span>
* <span style="color:brown">`DELETE` to remove a friend from a user's friend list</span>

---

**`/api/thoughts`**
* <span style="color:brown">`GET` to get all thoughts</span>
* <span style="color:brown">`GET` to get a single thought by its `_id`</span>
* <span style="color:brown">`POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)</span>
* <span style="color:brown">`PUT` to update a thought by its `_id`</span>
* <span style="color:brown">`DELETE` to remove a thought by its `_id`</span>

---

**`/api/thoughts/:thoughtId/reactions`**
* <span style="color:brown">`POST` to create a reaction stored in a single thought's `reactions` array field</span>
* <span style="color:brown">`DELETE` to pull and remove a reaction by the reaction's `reactionId` value</span>

---
© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.