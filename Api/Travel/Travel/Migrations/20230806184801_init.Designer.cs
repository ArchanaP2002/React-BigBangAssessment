﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Travel.Data;

#nullable disable

namespace Travel.Migrations
{
    [DbContext(typeof(TravelDbContext))]
    [Migration("20230806184801_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Travel.Models.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookingId"));

                    b.Property<DateTime?>("DateOfBooking")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateOfTheTrip")
                        .HasColumnType("datetime2");

                    b.Property<int?>("NumberOfPeople")
                        .HasColumnType("int");

                    b.Property<int?>("PackageId")
                        .HasColumnType("int");

                    b.Property<decimal?>("TotalAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("BookingId");

                    b.HasIndex("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("Travel.Models.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("Travel.Models.Feedback", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateSubmitted")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rating")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("Travel.Models.Hotel", b =>
                {
                    b.Property<int>("HotelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("HotelId"));

                    b.Property<string>("HotelName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("HotelPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("HotelRating")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("HotelsImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PackageId")
                        .HasColumnType("int");

                    b.HasKey("HotelId");

                    b.HasIndex("PackageId");

                    b.ToTable("Hotel");
                });

            modelBuilder.Entity("Travel.Models.ImageGallary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ImageDetails")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ImageGallaries");
                });

            modelBuilder.Entity("Travel.Models.ItineraryDetail", b =>
                {
                    b.Property<int>("ItineraryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItineraryId"));

                    b.Property<string>("Activities")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DayNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ItineraryImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ItineraryPlace")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PackageId")
                        .HasColumnType("int");

                    b.Property<int?>("PackagesPackageId")
                        .HasColumnType("int");

                    b.Property<string>("Time")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ItineraryId");

                    b.HasIndex("PackagesPackageId");

                    b.ToTable("ItineraryDetail");
                });

            modelBuilder.Entity("Travel.Models.Packages", b =>
                {
                    b.Property<int>("PackageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PackageId"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Duration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("PackagePrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Place")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("Travel.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmailId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Id_Proof")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Travel.Models.Booking", b =>
                {
                    b.HasOne("Travel.Models.Packages", "Package")
                        .WithMany("Bookings")
                        .HasForeignKey("PackageId");

                    b.HasOne("Travel.Models.User", "User")
                        .WithMany("BookingTrips")
                        .HasForeignKey("UserId");

                    b.Navigation("Package");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Travel.Models.Contact", b =>
                {
                    b.HasOne("Travel.Models.User", "User")
                        .WithMany("Contacts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Travel.Models.Feedback", b =>
                {
                    b.HasOne("Travel.Models.User", "User")
                        .WithMany("Feedbacks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Travel.Models.Hotel", b =>
                {
                    b.HasOne("Travel.Models.Packages", "Package")
                        .WithMany("Hotels")
                        .HasForeignKey("PackageId");

                    b.Navigation("Package");
                });

            modelBuilder.Entity("Travel.Models.ImageGallary", b =>
                {
                    b.HasOne("Travel.Models.User", "User")
                        .WithMany("ImageGallaries")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Travel.Models.ItineraryDetail", b =>
                {
                    b.HasOne("Travel.Models.Packages", null)
                        .WithMany("ItineraryDetails")
                        .HasForeignKey("PackagesPackageId");
                });

            modelBuilder.Entity("Travel.Models.Packages", b =>
                {
                    b.HasOne("Travel.Models.User", "User")
                        .WithMany("Packages")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Travel.Models.Packages", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Hotels");

                    b.Navigation("ItineraryDetails");
                });

            modelBuilder.Entity("Travel.Models.User", b =>
                {
                    b.Navigation("BookingTrips");

                    b.Navigation("Contacts");

                    b.Navigation("Feedbacks");

                    b.Navigation("ImageGallaries");

                    b.Navigation("Packages");
                });
#pragma warning restore 612, 618
        }
    }
}
