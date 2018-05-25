Feature: Person stuff

    Functionality surrounding the Person

    Background: I'm logged in and am viewing a person
        Given I am logged in
        And I am on the Person page

    Scenario: User can add new AC Type Rating with different Position as existing record if Aircraft matches
        When I choose name "John"
        Then I should be able to choose state "FL"

    Scenario: User can add new AC Type Rating with different Aircraft as existing record if Position matches
        When I choose state "OH"
        Then I should be able to choose name "Jim"

    Scenario: User can add new AC Type Rating with different Position as existing record if Aircraft matches
        When I choose name "Jane"
        Then I should not be able to choose state "FAKE STATE"

    Scenario: User can add new AC Type Rating with different Aircraft as existing record if Position matches
        When I choose state "CA"
        Then I should not be able to choose name "FAKE NAME"

