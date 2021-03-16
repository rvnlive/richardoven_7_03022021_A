<template>
  <b-container class="animate">
    <b-jumbotron fluid bg-variant="transparent" class="border-0"></b-jumbotron>
    <b-container fluid>
      <div class="row justify-content-center">
        <div class="col-xl-11">
          <div class="widecard-background shadow-profile rounded-lg shadow-lg">
              <div class="row d-flex align-items-center">
                <div class="col-12 d-flex justify-content-center">
                  <div class="image-default">
                    <b-img
                      class="rounded-circle"
                      :src="user.profileImage"
                      alt="Profile image"
                      @click="showShowProfileImage = !showShowProfileImage"
                    />
                    <b-modal
                      v-model="showShowProfileImage"
                      no-stacking
                      hide-header-close
                      ok-only
                      size="lg"
                      centered
                      hide-header
                      hide-footer
                      body-bg-variant="gradient-primary"
                      aria-label="Profile Image"
                    >
                      <b-img
                        v-bind:src="user.profileImage"
                        thumbnail
                        style="max-width: 50vw"
                        center
                      ></b-img>
                      <div
                        class="row mt-3 rounded-lg justify-content-center ml-auto mr-auto"
                      >
                        <b-container
                          class="m-0 p-md-0 d-flex flex-column flex-md-row"
                        >
                          <p
                            class="h3 text-light ml-auto mr-auto ml-md-3 mr-md-auto"
                          >
                            {{ user.fullName }}
                          </p>
                          <div
                            class="header mt-1 text-light font-italic ml-auto mr-auto ml-md-auto mr-md-3"
                          >
                            Posted on {{ uploadDate }}
                          </div>
                        </b-container>
                        <b-container class="mt-4">
                          <b-container class="p-0 mb-3">
                            <b-button
                              variant="outline-light"
                              class="mr-3"
                              size="sm"
                              id="emoticon-feedback"
                              ><b-icon icon="hand-thumbs-up"></b-icon
                            ></b-button>
                            <b-tooltip
                              target="emoticon-feedback"
                              variant="primary"
                              triggers="hover"
                            >
                              <b-container class="row flex-nowrap">
                                <b-button
                                  variant="outline-light"
                                  class="mr-1"
                                  id="thumbup-btn"
                                  size="sm"
                                  ><b-icon icon="hand-thumbs-up"></b-icon
                                ></b-button>
                                <b-tooltip
                                  target="thumbup-btn"
                                  triggers="hover"
                                >
                                  Thumbs Up!
                                </b-tooltip>
                                <b-button
                                  variant="outline-light"
                                  class="mr-1"
                                  id="heart-btn"
                                  size="sm"
                                  ><b-icon icon="heart"></b-icon
                                ></b-button>
                                <b-tooltip target="heart-btn" triggers="hover">
                                  Loving It!
                                </b-tooltip>
                                <b-button
                                  variant="outline-light"
                                  class="mr-1"
                                  id="hearthalf-btn"
                                  size="sm"
                                  ><b-icon icon="heart-half"></b-icon
                                ></b-button>
                                <b-tooltip
                                  target="hearthalf-btn"
                                  triggers="hover"
                                >
                                  I'm sorry!
                                </b-tooltip>
                              </b-container>
                            </b-tooltip>
                            <b-button
                              v-b-toggle.collapse-comment
                              variant="outline-light"
                              size="sm"
                              >Comment
                              <span class="when-open"
                                ><b-icon icon="chevron-bar-up"></b-icon
                              ></span>
                              <span class="when-closed"
                                ><b-icon icon="chevron-bar-down"></b-icon
                              ></span>
                            </b-button>
                          </b-container>
                          <b-collapse id="collapse-comment">
                            <b-container
                              class="p-0 d-flex justify-content-center"
                            >
                              <b-form-input
                                id="textarea-no-resize"
                                class="hide-submit-btn"
                                placeholder="Write a comment..."
                                size="sm"
                                v-model="comment"
                                no-resize
                              ></b-form-input>
                              <b-button
                                id="comment-submit-btn"
                                type="submit"
                                variant="outline-light"
                                size="sm"
                                >Post</b-button
                              >
                            </b-container>
                          </b-collapse>
                        </b-container>
                      </div>
                    </b-modal>
                  </div>
                  <div class="pt-2 mt-5 mb-3">
                    <div class="h2">{{ user.fullName }}</div>
                    <span class="lead font-weight-lighter">{{ user.shortBio }}</span>
                  </div>
                </div>
              </div>
            <b-button
              v-b-toggle.collapse-1
              variant="outline-primary"
              class="mt-2 mb-3"
            >
              <span class="when-open"
                ><b-icon icon="chevron-bar-up"></b-icon
              ></span>
              <span class="when-closed"
                ><b-icon icon="chevron-bar-down"></b-icon
              ></span>
            </b-button>
            <b-collapse id="collapse-1" class="col-lg-12 m-0 p-0">
              <b-container
                class="pt-2 pb-3 border-top d-flex flex-column flex-md-row justify-self-between"
                style="width: 100%"
              >
                <b-button
                  class="mt-2 d-flex flex-column flex-nowrap align-items-center"
                  variant="outline-primary"
                  ><b-icon icon="people-fill"></b-icon> Groups
                  {{ user.numberOfGroupsJoined }}</b-button
                >
                <b-button
                  class="mt-2 shrinked-button ml-auto mr-auto d-flex flex-column flex-nowrap align-items-center"
                  variant="outline-primary"
                  @click="showMessagePopup = !showMessagePopup"
                  ><b-icon icon="envelope"></b-icon>
                  Send a message
                </b-button>
                <b-modal
                  v-model="showMessagePopup"
                  centered
                  hide-header
                  hide-footer
                  body-bg-variant="gradient-primary"
                >
                  <b-form-group class="mb-0">
                    <p class="lead font-weight-normal text-light m-0">
                      Message
                    </p>
                    <hr class="w-50 float-left mt-2 bg-light" />
                    <b-form-input
                      v-model="message.subject"
                      placeholder="Subject"
                      id="messageSubject"
                      size="sm"
                      class="border border-primary"
                    ></b-form-input>
                    <b-form-textarea
                      id="messageContent"
                      no-resize
                      v-model="message.content"
                      placeholder="Your message..."
                      rows="3"
                      size="sm"
                      class="mt-2 border border-primary"
                    ></b-form-textarea>

                    <b-form-file
                      id="messageFile"
                      multiple
                      v-model="message.file"
                      size="sm"
                      placeholder="Browse or drop file here..."
                      drop-placeholder="Drop file here..."
                      class="mt-3"
                    >
                      <template slot="file-name" slot-scope="{ names }">
                        <b-badge variant="primary">{{ names[0] }}</b-badge>
                        <b-badge
                          v-if="names.length > 1"
                          variant="primary"
                          class="ml-1"
                        >
                          + {{ names.length - 1 }} More files
                        </b-badge>
                      </template>
                    </b-form-file>
                    <b-container
                      class="p-0 mt-3 d-flex justify-content-between"
                    >
                      <b-button
                        size="sm"
                        class="mt-3"
                        variant="outline-light"
                        @click="message.file = null"
                        >Reset attachment</b-button
                      >
                      <b-button
                        size="sm"
                        class="mt-3"
                        variant="outline-light"
                        type="submit"
                        >Send message
                        <b-icon icon="chevron-compact-right"></b-icon
                      ></b-button>
                    </b-container>
                  </b-form-group>
                </b-modal>
                <b-button
                  class="mt-2 shrinked-button ml-auto mr-auto d-flex flex-column flex-nowrap align-items-center"
                  variant="outline-primary"
                  id="followColleague"
                  ><b-icon icon="person-plus-fill"></b-icon>Follow Colleague</b-button>
                          <b-popover placement="bottom" variant="primary" target="followColleague" triggers="focus" hide-header>
                            You started to follow {{ user.fullName }}!
          
        </b-popover>
                <b-button
                  class="mt-2 d-flex flex-column flex-nowrap align-items-center"
                  variant="outline-primary"
                  ><b-icon icon="person-lines-fill"></b-icon>Following
                  {{ user.numberOfFriends }}</b-button
                >
              </b-container>
            </b-collapse>
          </div>
        </div>
      </div>
    </b-container>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showMessagePopup: false,
      showShowProfileImage: false,
      comment: "",
      message: [{ subject: "" }, { content: "" }, { file: null }],
    };
  },
      computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
  },
  props: {
    uploadDate: {
      type: String,
      default: "13/03/2021",
    },
  },
};
</script>
<style lang="scss" scoped>
$extra-shadow: 0 0 10px 10px rgba(43, 43, 43, 0.336);

.shrinked-profile {
  max-width: 90vw;
}
.shrinked-button {
  min-width: 200px;
  max-width: 250px;
}

@media only screen and (max-width: 767.98px) {
  .shrinked-button {
    width: auto;
  }
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

#thumbup-btn,
#heart-btn,
#hearthalf-btn {
  transition: all 150ms ease-in-out;
  &:hover,
  &focus {
    transform: scale(1.2);
    margin-right: 10px;
    transition: all 150ms ease-in-out;
  }
}

#comment-submit-btn {
  position: relative;
  display: none;
  left: -2.5rem;
  border-radius: 0 15px 15px 0;
  width: 3rem;
  transition: all 350ms ease-in-out;
  z-index: 0;
  padding: 0;
  margin: 0;
}

.hide-submit-btn {
  width: 80%;
  transition: all 350ms ease-in-out;
  z-index: 1;
  &:hover {
    width: 100%;
    box-shadow: $extra-shadow;
    transition: all 350ms ease-in-out;
  }
  &:focus {
    width: 100%;
    box-shadow: $extra-shadow;
    transition: all 350ms ease-in-out;
  }
  &:focus + #comment-submit-btn {
    transition: all 350ms ease-in-out;
    left: -0.25rem;
    display: inline-block;
  }
}

#messageSubject,
#messageContent {
  transition: all 350ms ease-in-out;
  &:hover,
  &:focus {
    box-shadow: $extra-shadow;
    transform: scale(1.01);
    transition: all 350ms ease-in-out;
  }
}

.jumbotron {
  margin: 0;
  color: #fff !important;
  height: 200px;
  position: relative;
  padding: 0;
}

.container-fluid {
  padding: 30px 30px;
}

.shadow-profile {
  margin-top: -140px;
  position: relative;
  &:before {
    content: "";
    background: rgba(255, 255, 255, 0.6);
    height: 20px;
    width: 90%;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 4px 4px 0 0;
  }
  &:after {
    content: "";
    background: rgba(255, 255, 255, 0.3);
    height: 20px;
    width: 80%;
    position: absolute;
    top: -40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 4px 4px 0 0;
  }
}

.widecard-background {
  background: #fff;
  border-radius: 0;
  border: none;
  margin-bottom: 30px;
}

.image-default img {
  width: 120px;
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 1);
  z-index: 10;
}
.infos {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 1rem;
  line-height: 1.8rem;
  h2 {
    color: #2c304d;
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
}
</style>