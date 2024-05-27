// <copyright file="Set.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Model
{
    internal sealed class Set
    {
        public ushort OperationsPerPage { get; set; }

        public ushort TotalPages { get; set; }
    }
}
