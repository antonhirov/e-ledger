// <copyright file="Selection.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Api.Model
{
    internal sealed class Selection
    {
        public ushort SelectedPage { get; set; }

        public List<Operation> SelectedOperations { get; set; }
    }
}
