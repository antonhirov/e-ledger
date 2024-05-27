// <copyright file="UserController.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class UserController : BaseController
    {
        [HttpGet]
        public string GetUser()
        {
            return "user"; // TODO!!!
        }

        [HttpPost]
        public void CreateUser()
        {
            // TODO!!!
        }

        [HttpDelete]
        public void DeleteUser()
        {
            // TODO!!!
        }

        [HttpPatch]
        public void UpdatePassword()
        {
            // TODO!!!
        }
    }
}
