
describe("Servers test (with setup and tear-down)", function() {
  
  // Reset serverNameInput value before each test
  beforeEach(function () {
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    // Act: Trigger the function to add a server
    submitServerInfo();

    // Assert: Check that a new server is added to allServers
    expect(allServers).toEqual({
      'server1': { serverName: 'Alice' }
    });
    expect(serverId).toEqual(1);
  });

  it('should not add a new server with empty input on submitServerInfo()', function () {
    // Arrange: Set the serverNameInput to an empty string
    serverNameInput.value = '';

    // Act: Try to submit the server info
    submitServerInfo();

    // Assert: allServers should remain empty
    expect(allServers).toEqual({});
    expect(serverId).toEqual(0);
  });

  it('should update #serverTable on updateServerTable()', function () {
    // Arrange: Add a server and update the server table
    submitServerInfo();
    updateServerTable();

    // Act: Select the table data cells
    let curTdList = document.querySelectorAll('#serverTable tbody tr td');

    // Assert: Check that the table is updated correctly
    expect(curTdList.length).toEqual(3);  // Name, Tip Average, Delete Button
    expect(curTdList[0].innerText).toEqual('Alice'); // Server name
    expect(curTdList[1].innerText).toEqual('$0.00'); // Tip average
    expect(curTdList[2].innerText).toEqual('X'); // Delete button
  });

  // Clean up after each test
  afterEach(function() {
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
    serverNameInput.value = '';
  });
});
