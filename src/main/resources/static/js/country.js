let opration = 0; // 0:init 1:add 2: upd 3:del
$(document).ready(function() {
	$("#detailContains").css("display", "none");
	// when click the create button, show the detailContains
	$("#selCreate").on('click', function() {
		// clear all input
		$(':input', '#frmDetail')
			.not(':button, :submit, :reset, :hidden')
			.val('');
		// show the detailContains
		$("#detailContains").css("display", "block");
		// hide the queryContainer
		$("#queryContainer").css("display", "none");

		opration = 1; // add
	});

	// when click the update button, show the queryContainer
	$("#selUpdate, #selDelete").on('click', function() {
		// show the queryContainer
		$("#queryContainer").css("display", "block");
		// hide the detailContains
		$("#detailContains").css("display", "none");
		// set the form action for update
		$("#frmDetail").attr("action", "/UpdateCountry");


		if ($(this).attr("id") == "selUpdate") {
			opration = 2; // upd
		} else {
			opration = 3; // del
		}
	});

	// when click the return button, hide the detailContains
	$("#returnBtn").on('click', function() {
		// show the queryContainer
		// $("#queryContainer").css("display", "block");
		// hide the detailContains
		$("#detailContains").css("display", "none");
	});

	$("#queryBtn").on('click', function() {
		// use ajax to post data to controller
		// recived the data from controller with json
		// show the data in the detailContains
		$.ajax({
			type: "POST",
			url: "/country/getCountry",        //  <- controller function name
			data: $("#frmSearch").serialize(),
			dataType: 'json',
			success: function(data) {
				$("#detailContains").css("display", "block");
				// show the data in the detailContains
				$("#countryCode").val(data.mstcountrycd);
				$("#countryName").val(data.mstcountrynanme);
			},
			error: function(e) {
				alert("error");
			}
		});
	});

	$("#updateBtn").on('click', function() {
		var url = "";
		if (opration == 1) {
			url = "/country/create";
		} else if (opration == 2) {
			url = "/country/update";
		} else if (opration == 3) {
			url = "/country/delete";
		} else {
			alert("opration error");
			return;
		}

		$.ajax({
			url: url,
			type: "POST",
			data: $("#frmDetail").serialize(),
			dataType: "json",
			success: function(data) {
				alert("success");
			},
			error: function(data) {
				alert("error");
			}
		});
	});
});